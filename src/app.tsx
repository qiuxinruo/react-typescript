import React from 'react'

import Router from '@/router/router'
import { withRouter } from 'react-router-dom'

const App = (props) => {
  return (<div className='app'>
    <Router />
  </div>
  )
}

export default withRouter(App)
