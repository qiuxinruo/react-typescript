import React from 'react'

import Header from './components/header'
import Toolbar from './components/toolbar'
import Content from './components/content'
import Sider from './components/sider'

import './index.less'

export default () => {
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
