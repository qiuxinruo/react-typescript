import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { RouteParams } from '@dashboard/router'
import { useParams, useHistory } from 'react-router-dom'

import { saveReport } from '@dashboard/service'
import { State } from '@dashboard/store'

import Table from './table'

const GridLayout = WidthProvider(Responsive)

export default () => {
  const dispatch = useDispatch()
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const { elements, layouts, selectId, name } = useSelector((state: State) => state)
  const history = useHistory()
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
          if (name) {
            dispatch({
              type: 'LAYOUTS_CHANGE',
              payload: layouts,
            })
            saveReport({
              name: name,
              workBookId: workbookId,
              reportId: dashboardId,
              elements: JSON.stringify(elements),
              layouts: JSON.stringify(layouts)
            }).then(res => {
                if(!res.success&&res.code=='A1010'){
                  history.replace('/dashboard/workbook')
                }
            })
          }
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
