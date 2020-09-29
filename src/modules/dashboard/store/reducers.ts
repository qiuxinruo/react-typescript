import immer from 'immer'

import { Dashboard } from '@dashboard/models'
import { addElement } from '@dashboard/service'

import { Action } from './actions'

export interface State extends Dashboard {
  selectId?: string
}

const initialState: State = {
  name: '测试表盘',
  dataSource: undefined,
  elements: {},
  layouts: [],
}

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return immer(state, draft => {
        addElement(draft, action.payload)
      })
    case 'SELECT_ELEMENT':
      return { ...state, selectId: action.payload }
    case 'LAYOUTS_CHANGE': {
      return { ...state, layouts: action.payload }
    }
    default:
      return state
  }
}
