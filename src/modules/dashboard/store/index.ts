import { createStore } from 'redux'

import reducers from './reducers'

export * from './reducers'

export default createStore(reducers)
