import React from 'react'
import { useDispatch } from 'react-redux'
import { TableOutlined } from '@ant-design/icons'

const icons = [
  {
    icon: TableOutlined,
    type: 'Table',
  },
]

export default () => {
  const dispatch = useDispatch()

  return (
    <div className="db_detail_toolbar">
      {icons.map(it => (
        <a
          className="db_detail_toolbar-icon"
          key={it.type}
          onClick={() => {
            dispatch({ type: 'ADD_ELEMENT', payload: it.type })
          }}
        >
          <it.icon />
        </a>
      ))}
    </div>
  )
}
