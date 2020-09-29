import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Detail from '@dashboard/view/detail'

export default () => (
  <>
    <Redirect from="/" exact to="/dashboard/detail/1" />
    <Route path="/dashboard/detail/:id" component={Detail} />
  </>
)
