import React from 'react'
import { useDispatch } from 'react-redux'
import { TableOutlined } from '@ant-design/icons'
import { RouteParams } from '@dashboard/router'
import { useParams } from 'react-router-dom'
import { message } from 'antd'

const icons = [
  {
    icon: TableOutlined,
    type: 'Table',
  },
]

export default () => {
  const dispatch = useDispatch()
  const { workbookId, dashboardId } = useParams<RouteParams>()
  return (
    <div className="db_detail_toolbar">
      {icons.map(it => (
        <a
          className="db_detail_toolbar-icon"
          key={it.type}
          onClick={() => {
            if(dashboardId!==undefined){
              message.success('表格添加成功')
              dispatch({ type: 'ADD_ELEMENT', payload: it.type })
            }else {
              message.warning('请先添加报表')
              return false
            }
          }}
        >
          <it.icon />
        </a>
      ))}
    </div>
  )
}
