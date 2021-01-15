import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Modal, Tabs, Dropdown, Menu, message } from 'antd'
import { LeftOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { State } from '@dashboard/store'
import { useDispatch, useSelector } from 'react-redux'
import { queryReportList, saveReport, deleteRepoet, editReport } from '@dashboard/service'
import { deepCopy } from '@/common/utils'
import { RouteParams } from '@dashboard/router'
import RenameRender from './rename'
import Loading from '@dashboard/components/loading'

const { TabPane } = Tabs
const { Item } = Menu

export default (props) => {
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const { elements, layouts, workBookInfo } = useSelector((state: State) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [tabList, setTabList] = useState([])
  const [loading, setLoading] = useState(false)
  const [showEdit, setEdit] = useState(false)
  const [tabName, setTabname] = useState('')
  const [tabKey, setTabKey] = useState('')
  const newName = '新建报表'

  useEffect(() => {
    getReportList()
  }, [])

  //获取tabList
  const getReportList = () => {
    setLoading(true)
    queryReportList({ workBookId: workbookId }).then(res => {
      setLoading(false)
      if (res.success) {
        const {reports,workBook} = res.data
        setTabList(reports)
        if (reports.length) {
          let newDashboardId = dashboardId ? dashboardId : reports[0].reportId
          history.replace(`/dashboard/detail/${workbookId}/${newDashboardId}`)
          editReportHandle(workbookId, newDashboardId)
        } else {
          add()
        }
        dispatch({
          type: 'WORKBOOK_INFO_CHANGE',
          payload: workBook
        })
        if(!workBook.isEdit){
          Modal.info({
            title: '消息通知',
            content:(
            <div>{workBook.currentUserName}正在编辑中···</div>
            ),
            onOk() {
              history.push('/dashboard/workbook')
            }
          })
        }
      }
    }).catch(err => console.log(err))
  }
  //获取报表详情
  const editReportHandle = (e, e1) => {
    setLoading(true)
    editReport(e, e1).then(res => {
      setLoading(false)
      if (res.success) {
        const { data } = res
        const newLayouts = data.layouts ? JSON.parse(data.layouts) : []
        const newElements = data.elements ? JSON.parse(data.elements) : {}
        let list = []
        for(let i in newElements){
          list.push(i)
        }
        dispatch({
          type: 'INIT_STATE',
          payload: {
            layouts: newLayouts,
            elements: newElements,
            name: data.name
          }
        })
        dispatch({
          type: 'SELECT_ELEMENT',
          payload: list.length?list[0]:'',
        })
      }
    })
  }

  const claseModal = (e) => {
    if (e) {
      saveReport({
        workBookId: workbookId,
        name: e,
        elements: JSON.stringify(elements),
        layouts: JSON.stringify(layouts),
        reportId: dashboardId,
      }).then(res => {
        if (res.success) {
          const list = tabList.map(item => {
            if (item.reportId == tabKey) {
              return {
                ...item,
                name: e
              }
            } else {
              return item
            }
          })
          setTabList(list)
          dispatch({
            type: 'INIT_STATE',
            payload: {
              name: e,
              layouts: layouts,
              elements: elements
            }
          })
        } else {
          if(res.code=='A1010'){
            history.replace('/dashboard/workbook')
          }else {
            message.warning('保存失败')
          }
        }
      })
    }
    setEdit(false)
  }

  const editTabs = (targetKey, action) => {
    switch (action) {
      case 'add': add()
        break
      case 'remove':
        break
    }
  }
  //添加报表
  const add = () => {
    setLoading(true)
    saveReport({
      workBookId: workbookId,
      name: newName,
      elements: '',
      layouts: ''
    }).then(res => {
      setLoading(false)
      if (res.success) {
        let newList = [{
          reportId: res.data,
          name: newName
        }]
        setTabList(tabList.concat(newList))
        history.replace(`/dashboard/detail/${workbookId}/${res.data}`)
        dispatch({
          type: 'CANVAS_MOUSE_DOWN',
        })
        dispatch({
          type: 'INIT_STATE',
          payload: {
            name: newName,
            layouts: [],
            elements: {}
          }
        })
      }else {
        if(res.code=='A1010'){
          history.replace('/dashboard/workbook')
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }
  //删除报表
  const remove = (targetKey) => {
    deleteRepoet({ reportId: targetKey }).then(res => {
      if (res.success) {
        const newList = deepCopy(tabList).filter((item, index) => item.reportId != targetKey)
        let str = ''
        if (newList.length) {
          str = `${workbookId}/${newList[0].reportId}`
          editReportHandle(workbookId, newList[0].reportId)
        } else {
          str = `${workbookId}`
        }
        setTabList(newList)
        history.replace(`/dashboard/detail/${str}`)
        dispatch({
          type: 'CANVAS_MOUSE_DOWN',
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  //切换报表
  const changeTab = (key) => {
    history.replace(`/dashboard/detail/${workbookId}/${key}`)
    editReportHandle(workbookId, key)
    dispatch({
      type: 'CANVAS_MOUSE_DOWN',
    })
  }

  const editName = (key) => {
    setTabKey(key)
    setTabname(tabList.filter(item => item.reportId === key)[0].name)
    setEdit(true)
  }

  const overlay = (targetKey) => {
    return <Menu
      className="undraggable"
      onClick={({ key, domEvent }) => {
        domEvent.stopPropagation()
        switch (key) {
          case 'remove': remove(targetKey);
            break;
          case 'rename': editName(targetKey);
            break
        }
      }}
    >
      <Item key="rename">
        <EditOutlined />
        <span>重命名</span>
      </Item>
      <Item key="remove">
        <DeleteOutlined />
        <span>删除报表</span>
      </Item>
    </Menu>
  }

  return (
    <header className="db_detail_header">
      <Tabs size="small"
        type="editable-card"
        onChange={key => changeTab(key)}
        activeKey={dashboardId}
        onEdit={(targetKey, action) => editTabs(targetKey, action)}>
        {
          (tabList || []).map((item, index) => {
            return <TabPane key={item.reportId} tab={item.name} closeIcon={<div onClick={() => changeTab(item.reportId)}><Dropdown overlay={overlay(item.reportId)} trigger={['click']}><MoreOutlined className='db_detail_header-more' /></Dropdown></div>}></TabPane>
          })
        }
      </Tabs>
      {
        showEdit && <RenameRender name={tabName} closeModal={(e) => claseModal(e)}
        />
      }
      {
        loading && <Loading />
      }
    </header>
  )
}
