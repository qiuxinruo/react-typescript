import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { MoreOutlined } from '@ant-design/icons'
import { Element } from '@dashboard/models'

const Container: FunctionComponent<{ data: Element }> = ({
  data,
  children,
}) => {
  const { id, name } = data

  const dispatch = useDispatch()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseDown={() => {
        dispatch({
          type: 'SELECT_ELEMENT',
          payload: id,
        })
      }}
    >
      <div
        className="grid-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        <div>{name}</div>
        <MoreOutlined style={{ color: 'rgba(0,0,0,.65)', cursor: 'pointer' }} />
      </div>

      <div style={{ cursor: 'move', flexGrow: 1 }}>{children}</div>
    </div>
  )
}

export default Container
