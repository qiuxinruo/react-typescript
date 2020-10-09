import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import { State } from '@dashboard/store'

export default () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: State) => state)

  return (
    <header className="db_header">
      <div>
        <Link to="/dashboards">
          <LeftOutlined />
        </Link>
        <span className="db_header-title">{name}</span>
      </div>

      <div>
        <Button type="primary" shape="round">
          保存
        </Button>
      </div>
    </header>
  )
}
