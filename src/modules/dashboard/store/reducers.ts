import immer from 'immer'

import { Dashboard } from '@dashboard/models'
import { addElement, deleteElement } from '@dashboard/service'

import { Action } from './actions'

export interface State extends Dashboard {
  selectId?: string,
  workBookInfo?: Object,
  project?: Object,
  modular?: Object,
  page?: Object,
  env_choose?:String,
  envs?: Array<Object>
}

const initialState: State = {
  name: '',
  dataSet: undefined,
  elements: {},
  layouts: [],
}

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return immer(state, draft => {
        addElement(draft, action.payload)
      })
    case 'DELETE_ELEMENT':
      return immer(state, draft => {
        if (draft.selectId === action.payload) draft.selectId = undefined
        deleteElement(draft, action.payload)
      })
    case 'SELECT_ELEMENT':
      return { ...state, selectId: action.payload }
    case 'LAYOUTS_CHANGE':
      return { ...state, layouts: action.payload }
    case 'ELEMENTS_CHANGE':
      return { ...state, elements: action.payload }
    case 'CANVAS_MOUSE_DOWN':
      return { ...state, selectId: undefined }
    case 'INIT_STATE':
      return { ...state, name: action.payload.name, elements: action.payload.elements, layouts: action.payload.layouts }
    case 'WORKBOOK_INFO_CHANGE':
      return { ...state, workBookInfo: action.payload }
    case 'SET_PROJECT':
      return { ...state, project: action.payload }
    case 'SET_MODULAR':
      return { ...state, modular: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_ENV_CHOOSE':
      return {...state, env_choose:action.payload}
    case 'SET_ENVS': 
    return {...state,envs:action.payload}
    default:
      return state
  }
}
