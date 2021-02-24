import React, { useEffect } from 'react'
import { Route, Redirect, useParams,withRouter,Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import Index from '@/view/index'
const RouterRender= (props) => {
  return <>
  <Switch>
    <Route
      exact
      path="/"
      component={Index}
    />
  </Switch>
  </>
}

export default withRouter(RouterRender)
