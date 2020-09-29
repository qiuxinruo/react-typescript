import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { LeftOutlined, TableOutlined } from '@ant-design/icons'

import { State } from '@dashboard/store'

export default () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state: State) => state)

  return (
    <header style={{ boxShadow: '0 0 10px rgba(0,0,0,.2)' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 8px',
          height: 45,
        }}
      >
        <div>
          <Link to="/dashboards">
            <LeftOutlined />
          </Link>
          <span style={{ fontSize: 16, fontWeight: 700, marginLeft: 4 }}>
            {name}
          </span>
        </div>

        <div>
          <Button type="primary">保存</Button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 32,
          padding: '0 8px',
          borderTop: '1px solid rgba(0,0,0,.1)',
        }}
      >
        {icons.map(it => (
          <it.icon
            key={it.type}
            className="icon-button"
            onClick={() => {
              dispatch({ type: 'ADD_ELEMENT', payload: it.type })
            }}
          />
        ))}
      </div>
    </header>
  )
}

const icons = [
  {
    icon: TableOutlined,
    type: 'Table',
  },
]
