import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Button, Tabs } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import { RouteParams } from '@dashboard/router'

const { TabPane } = Tabs

export default () => {
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const history = useHistory()

  return (
    <header className="db_detail_header">
      <div className="db_detail_header-main">
        <div>
          <Link to="/dashboards">
            <LeftOutlined />
          </Link>
          <span className="db_detail_header-title">工作簿</span>
        </div>

        <div>
          <Button type="primary" shape="round">
            分享
          </Button>
        </div>
      </div>
      <Tabs
        size="small"
        type="editable-card"
        onChange={key => {
          history.push(`/dashboard/detail/${workbookId}/${key}`)
        }}
      >
        <TabPane key="1" tab="仪表板" />
        <TabPane key="2" tab="仪表板2" />
      </Tabs>
    </header>
  )
}
