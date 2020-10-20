import React, { useEffect } from 'react'
import { Route, Redirect, useParams,withRouter,Switch } from 'react-router-dom'

import Detail from '@dashboard/view/detail'
import workBook from '@dashboard/view/workBook'
export interface RouteParams {
  workbookId: string
  dashboardId?: string
}

const RouterRender= (props) => {
  return <>
  <Switch>
    <Redirect from='/' exact to="/dashboard/workbook" />
    <Route path="/dashboard/workbook" component={workBook} />
    <Route path={`/dashboard/detail/:workbookId/:dashboardId?`} component={Detail} />
  </Switch>
  </>
}

export default withRouter(RouterRender)
