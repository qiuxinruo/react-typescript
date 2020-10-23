import React, { useEffect } from 'react'
import {  useParams ,useHistory} from 'react-router-dom'
import { RouteParams } from '@dashboard/router'
import { alive } from '@dashboard/service'
import Header from './components/header'
import Toolbar from './components/toolbar'
import Content from './components/content'
import Sider from './components/sider'
import './index.less'

export default () => {
  const { workbookId, dashboardId } = useParams<RouteParams>()
  let setTimeouts = null
  const history = useHistory()
  useEffect(() => {
    setTime()
    return componentWillUnmount
  }, [])

  function componentWillUnmount() {
    clearTimeout(setTimeouts)
  }

  const setTime=()=> {
    console.log(1,new Date())
    alive({workBookId:workbookId}).then(res=> {
      if(!res.success){
        history.replace('/dashboard/workbook')
      }
    })
    setTimeouts=setTimeout(() => {
      setTime()
    }, 5000)
  }

  return (
    <div className="db_detail_index">
      <Header />
      <div className="db_detail_index-body">
        <Sider />
        <div className="db_detail_index-editor">
          <Toolbar />
          <Content />
        </div>
      </div>
    </div>
  )
}
