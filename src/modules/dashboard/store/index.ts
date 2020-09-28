import { createStore, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import reducers from './reducers'
import epics from './epics'

const allEpics: any = combineEpics(...epics)
const middleware = createEpicMiddleware()
const store = createStore(reducers, applyMiddleware(middleware))
middleware.run(allEpics)

export * from './reducers'

export default store
