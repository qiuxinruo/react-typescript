import React, { useEffect } from 'react'
import { Route, Redirect, useParams,withRouter,Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import Detail from '@dashboard/view/detail'
import workBook from '@dashboard/view/workBook'
import login from '@dashboard/view/Login'
export interface RouteParams {
  workbookId: string
  dashboardId?: string
}

const PrivateRoute = ({component: Component, ...rest}) => {
  const isAuthenticated = Cookies.get('isLogined') === '1'
  if (isAuthenticated) {
    return (
        <Route {...rest} render={props => <Component {...props} />} />
    )
  }
  return <Route {...rest} render={() => <Redirect to="/dashboard/login" />} />
}

const RouterRender= (props) => {
  return <>
  <Switch>
    <Route
      exact
      path="/"
      component={() =>
        (Cookies.get('isLogined') === '1' ? (
          <Redirect to='/dashboard/workbook' />
        ) : (
          <Redirect to="/dashboard/login" />
        ))
      }
    />
    <Route path="/dashboard/login" component={login} />
    <PrivateRoute path="/dashboard/workbook" component={workBook} />
    <PrivateRoute path={`/dashboard/detail/:workbookId/:dashboardId?`} component={Detail} />
  </Switch>
  </>
}

export default withRouter(RouterRender)
