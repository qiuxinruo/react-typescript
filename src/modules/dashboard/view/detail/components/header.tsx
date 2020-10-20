import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { queryReportList, saveReport, deleteRepoet, editReport } from '@dashboard/service'
import { deepCopy } from '@/common/utils'
import { RouteParams } from '@dashboard/router'
const { TabPane } = Tabs

export default (props) => {
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const dispatch = useDispatch()
  const history = useHistory()
  const [tabList, setTabList] = useState([])
  useEffect(() => {
    getReportList()
  }, [])

  const getReportList = () => {
    queryReportList({ workBookId: workbookId }).then(res => {
      if (res.success) {
        setTabList(res.data)
        if (res.data.length) {
          history.push(`/dashboard/detail/${workbookId}/${res.data[0].reportId}`)
          editReportHandle(workbookId, res.data[0].reportId)
        }
      }
    }).catch(err => console.log(err))
  }

  const editReportHandle = (e, e1) => {
    editReport(e, e1).then(res => {
      if (res.success) {
        const { data } = res
        const newLayouts = data.layouts? JSON.parse(data.layouts) :[]
        const newElements= data.elements? JSON.parse(data.elements) : {}
        dispatch({
          type: 'INIT_STATE',
          payload: {
              layouts: newLayouts,
              elements: newElements,
              name: data.name
          }
        })
        dispatch({
          type: 'DATASET_ID_CHANGE',
          payload: data.dataSetId
        })
        dispatch({
          type: 'SAVE_DATASET_CUBE_NAME',
          payload: data.dataSetCubeName
        })
      }
    })
  }


  const editTabs = (targetKey, action) => {
    switch (action) {
      case 'add': add()
        break
      case 'remove': remove(targetKey)
        break
    }
  }

  const add = () => {
    saveReport({
      workBookId: workbookId,
      name: '新建报表',
      elements: '',
      layouts: ''
    }).then(res => {
      if (res.success) {
        let newList = [{
          reportId: res.data,
          name: '新建报表'
        }]
        setTabList(tabList.concat(newList))
        history.push(`/dashboard/detail/${workbookId}/${res.data}`)
        dispatch({
          type: 'CANVAS_MOUSE_DOWN',
        })
        dispatch({
          type: 'INIT_STATE',
          payload: {
            name: '新建报表',
            layouts: [],
            elements: {}
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const remove = (targetKey) => {
    deleteRepoet({ reportId: targetKey }).then(res => {
      if(res.success){
        const newList = deepCopy(tabList).filter((item, index) => item.reportId != targetKey)
        let str = ''
        if(newList.length){
          str = `${workbookId}/${newList[0].reportId}`
          editReportHandle(workbookId,newList[0].reportId)
        }else{
          str = `${workbookId}`
        }
        setTabList(newList)
        history.push(`/dashboard/detail/${str}`)
        dispatch({
          type: 'CANVAS_MOUSE_DOWN',
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const changeTab = (key) => {
    history.push(`/dashboard/detail/${workbookId}/${key}`)
    editReportHandle(workbookId, key)
    dispatch({
      type: 'CANVAS_MOUSE_DOWN',
    })
  }

  return (
    <header className="db_detail_header">
      <div className="db_detail_header-main">
        <div>
            <LeftOutlined onClick={()=>{
              history.push('/dashboard/workbook')
              dispatch({
                type: 'INIT_STATE',
                payload: {
                  layouts: [],
                  elements: {},
                  name: ''
                }
              })
            }}/>
          <span className="db_detail_header-title">工作簿</span>
        </div>
        <div>
          <Button type="primary" shape="round">
            分享
          </Button>
        </div>
      </div>
      <Tabs size="small"
        type="editable-card"
        onChange={key => changeTab(key)}
        activeKey={dashboardId}
        onEdit={(targetKey, action) => editTabs(targetKey, action)}>
        {
          (tabList || []).map((item, index) => {
            return <TabPane key={item.reportId} tab={item.name} />
          })
        }
      </Tabs>
    </header>
  )
}
