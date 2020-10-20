import React from 'react'

import DashBoard from '@dashboard/router'
import Nav from './nav'
import Header from './header'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

const App = (props) => {
  const pathList  = props.location.pathname.split('/')
  return (<div className='db_app'>
    <Header />
    {
      !pathList.some(item=>item==='detail')&& < Nav />
    }
    <div className={classnames('db_app_DashBoard-wrap')}>
      <DashBoard />
    </div>
  </div>
  )
}

export default withRouter(App)
