import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Detail from '@dashboard/view/detail'

export interface RouteParams {
  workbookId: string
  dashboardId?: string
}

export default () => (
  <>
    <Redirect from="/" exact to="/dashboard/detail/1/1" />
    <Route
      path="/dashboard/detail/:workbookId/:dashboardId?"
      component={Detail}
    />
  </>
)
