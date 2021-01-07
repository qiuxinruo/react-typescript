import React, { FunctionComponent, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Dropdown, Menu, message } from 'antd'
import { MoreOutlined, DeleteOutlined, ExportOutlined, EditOutlined } from '@ant-design/icons'
import { exportData, saveReport } from '@dashboard/service'
import { Element } from '@dashboard/models'
import RenameRender from './rename'
import { deepCopy } from '@/common/utils'
import { downloadFileByPost } from '@dashboard/service/downLoad'
import { RouteParams } from '@dashboard/router'
import { useParams,useHistory } from 'react-router-dom'
import { State } from '@dashboard/store'
const { Item } = Menu

const Container: FunctionComponent<{ data: Element }> = ({
  data,
  children,
}) => {
  const { id } = data
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const [showEdit, setEdit] = useState(false)
  const { workBookInfo,elements,layouts,name } = useSelector((state: State) => state)
  const history = useHistory()
  const dispatch = useDispatch()

  const exportDataHandle = () => {
    let newData = deepCopy(data)
    
    const {dimensions=[],measures=[],filters=[],calculateFields=[]} = newData
    const newDimensions = dimensions.map(item=> {
      let newItem = {...item, columnName: item.alias}
      delete newItem.alias
      return newItem
    })
    const newMeasures = measures.concat(calculateFields).map(item=> {
      let newItem = {...item, columnName: item.name}
      delete newItem.name
      return newItem
    })
    const newList = newDimensions.concat(newMeasures).sort((a,b)=>{return a.sortId-b.sortId})
    const newWorkBookInfo = deepCopy(workBookInfo)
    downloadFileByPost('/bi-gateway/das/report/export',{
      type: 'excel',
      chartId: data.id,
      dataSetId: newWorkBookInfo.dataSetId,
      fileName: data.name,
      chartType: 'grid',
      dimensionFilters:filters.filter(item=>!item.function&&!item.expression),
      measureFilters:filters.filter(item=>item.function),
      calculateFieldFilters:filters.filter(item=>item.expression),
      columns:newList.map(item=> {
        delete item.sortId
        return item
      })
    },data.name+'.xlsx').then(res=> {

    })
  }

  const claseModal=(e)=> {
    const newData = deepCopy(data)
    if(e) {
      newData.name = e
      const newElements = deepCopy(elements)
      newElements[data.id] = newData
      dispatch({
        type: 'INIT_STATE',
        payload: {
          layouts: layouts,
          elements: newElements,
          name: name
        }
      })
      saveReport({
        workBookId: workbookId,
        reportId: dashboardId,
        name: name,
        layouts: JSON.stringify(layouts),
        elements: JSON.stringify(newElements)

      }).then(res=> {
        if(!res.success&& res.code=='A1010'){
          history.replace('/dashboard/workbook')
        }
      })
    }
    setEdit(false)
  }

  const overlay = (
    <Menu
      className="undraggable"
      onClick={({ key, domEvent }) => {
        domEvent.stopPropagation()
        switch (key) {
          case 'DELETE_ELEMENT':
            dispatch({
              type: key,
              payload: id,
            });
            break;
          case 'export':
            exportDataHandle();
            break;
          case 'rename':
            setEdit(true)
            break;
        }
      }}
    >
      <Item key="rename">
        <EditOutlined />
        <span>重命名</span>
      </Item>
      <Item key="DELETE_ELEMENT">
        <DeleteOutlined />
        <span>删除图表</span>
      </Item>
      <Item key="export">
        <ExportOutlined />
        <span>导出数据</span>
      </Item>
    </Menu>
  )
  return (
    <div className="db_detail_container" onMouseDown={() => {
      dispatch({
        type: 'SELECT_ELEMENT',
        payload: id,
      })
    }}>
      <div className="db_detail_container-header">
        <div>{data.name}</div>
        <Dropdown className="undraggable" overlay={overlay} trigger={['click']}>
          <div className="db_detail_container-more">
            <MoreOutlined className='db_detail_container-moreIcon' />
          </div>
        </Dropdown>
      </div>
      <div
        className="db_detail_container-content"
      >
        {children}
      </div>
      {
        showEdit&&<RenameRender name={data.name} closeModal={(e)=>claseModal(e)}
          />
      }
    </div>
  )
}

export default Container
