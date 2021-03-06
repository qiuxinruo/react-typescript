import React, { SFC } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { render } from 'react-dom'

import './index.less'

import App from './app'
import store from '@/store'

const run = (App) => {
  render(
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
  )
}

run(App)

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept('./app', () => {
    //@ts-ignore
    const App = require('./app').default
    run(App)
  })
}
