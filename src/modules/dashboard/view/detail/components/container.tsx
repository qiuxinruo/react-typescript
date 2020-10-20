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
import { useParams } from 'react-router-dom'
import { State } from '@dashboard/store'
const { Item } = Menu

const Container: FunctionComponent<{ data: Element }> = ({
  data,
  children,
}) => {
  const { id } = data
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const [showEdit, setEdit] = useState(false)
  const { dataSetId,elements,layouts,name } = useSelector((state: State) => state)
  const dispatch = useDispatch()

  const exportDataHandle = () => {
    let newData = deepCopy(data)
    const {dimensions=[],measures=[],filters} = newData
    const newDimensions = dimensions.map(item=> {
      delete item.alias
      return item
    })
    const newMeasures = measures.map(item=> {
      delete item.name
      return item
    })
    const newList = newDimensions.concat(newMeasures).sort((a,b)=>{return a.sortId-b.sortId})
    console.log(newList)
    downloadFileByPost('/das/report/export',{
      type: 'excel',
      chartId: data.id,
      dataSetId: dataSetId,
      fileName: data.name,
      chartType: 'grid',
      filters: filters.map(item=> {
        delete item.alias
        return item
      }),
      columns:newList.map(item=> {
        delete item.sortId
        return item
      })
    },data.name+'.xlsx')
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
        <span>删除元素</span>
      </Item>
      <Item key="export">
        <ExportOutlined />
        <span>导出数据</span>
      </Item>
    </Menu>
  )
  return (
    <div className="db_detail_container">
      <div className="db_detail_container-header">
        <div>{data.name}</div>
        <Dropdown className="undraggable" overlay={overlay} trigger={['click']}>
          <div className="db_detail_container-more">
            <MoreOutlined />
          </div>
        </Dropdown>
      </div>

      <div
        className="db_detail_container-content"
        onMouseDown={() => {
          dispatch({
            type: 'SELECT_ELEMENT',
            payload: id,
          })
        }}
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
