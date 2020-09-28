import React from 'react'
import { Route } from 'react-router-dom'

export default () => (
  <>
    <Route path="/" exact render={() => '首页'} />
  </>
)
