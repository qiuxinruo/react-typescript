import React from 'react'

import DashBoard from '@dashboard/router'
import Nav from './nav'
import Header from './header'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

const App = (props) => {
  console.log(props.location)
  const pathList  = props.location.pathname.split('/')
  console.log('223',pathList.some(item=>item!=='login'&&item!=='detail'))
  return (<div className='db_app'>
    {
      !pathList.some(item=>item==='login') && <Header />
    }
    {
      pathList.some(item=>item!=='login'&&item!=='detail') && < Nav />
    }
    <div className={classnames('db_app_DashBoard-wrap')}>
      <DashBoard />
    </div>
  </div>
  )
}

export default withRouter(App)
