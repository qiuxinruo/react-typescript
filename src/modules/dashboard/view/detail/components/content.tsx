import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'

import { State } from '@dashboard/store'

import Table from './table'

const GridLayout = WidthProvider(Responsive)

export default () => {
  const dispatch = useDispatch()
  const { elements, layouts, selectId } = useSelector((state: State) => state)

  return (
    <div
      id="dashboard-content"
      className="db_detail_content"
      onMouseDown={(e: any) => {
        if (
          e.target.id === 'dashboard-content' ||
          e.target.className === 'react-grid-layout'
        ) {
          dispatch({
            type: 'CANVAS_MOUSE_DOWN',
          })
        }
      }}
    >
      <GridLayout
        layouts={{ lg: layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        rowHeight={40}
        draggableCancel=".undraggable"
        margin={[16, 16]}
        isBounded
        onLayoutChange={layouts => {
          dispatch({
            type: 'LAYOUTS_CHANGE',
            payload: layouts,
          })
        }}
      >
        {Object.values(elements).map(data => {
          return (
            <div
              key={data.id}
              className="db_detail_content-wrapper"
              style={{
                outline: selectId === data.id ? '1px dashed #1890ff' : 'none',
              }}
            >
              <Table key={data.id} data={data} />
            </div>
          )
        })}
      </GridLayout>
    </div>
  )
}
