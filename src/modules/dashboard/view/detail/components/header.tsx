import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

const { TabPane } = Tabs

export default () => {
  return (
    <header className="db_header">
      <div className="db_header-main">
        <div>
          <Link to="/dashboards">
            <LeftOutlined />
          </Link>
          <span className="db_header-title">工作簿</span>
        </div>

        <div>
          <Button type="primary" shape="round">
            分享
          </Button>
        </div>
      </div>
      <Tabs size="small" type="editable-card">
        <TabPane key="1" tab="仪表板" />
        <TabPane key="2" tab="仪表板2" />
      </Tabs>
    </header>
  )
}
