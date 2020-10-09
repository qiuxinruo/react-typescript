import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Dropdown, Menu } from 'antd'
import { MoreOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons'

import { Element } from '@dashboard/models'

const { Item } = Menu

const Container: FunctionComponent<{ data: Element }> = ({
  data,
  children,
}) => {
  const { id, name } = data

  const dispatch = useDispatch()

  const overlay = (
    <Menu
      className="undraggable"
      onClick={({ key, domEvent }) => {
        domEvent.stopPropagation()
        dispatch({
          type: key,
          payload: id,
        })
      }}
    >
      <Item key="DELETE_ELEMENT">
        <DeleteOutlined />
        <span>删除元素</span>
      </Item>
      <Item key="export">
        <ExportOutlined />
        <span>导出数据</span>
      </Item>
    </Menu>
  )

  return (
    <div className="db_container">
      <div className="db_container-header">
        <div>{name}</div>
        <Dropdown className="undraggable" overlay={overlay} trigger={['click']}>
          <div className="db_container-more">
            <MoreOutlined />
          </div>
        </Dropdown>
      </div>

      <div
        className="db_container-content"
        onMouseDown={() => {
          dispatch({
            type: 'SELECT_ELEMENT',
            payload: id,
          })
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
