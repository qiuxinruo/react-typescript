import React from 'react'

import Header from './components/header'
import Toolbar from './components/toolbar'
import Content from './components/content'
import Sider from './components/sider'

import './index.less'

export default () => {
  return (
    <div className="db_detail">
      <Header />
      <div className="db_detail-body">
        <Sider />
        <div className="db_detail-editor">
          <Toolbar />
          <Content />
        </div>
      </div>
    </div>
  )
}
