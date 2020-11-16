import { Element, Dashboard } from '@dashboard/models'

export interface AddElementAction {
  type: 'ADD_ELEMENT'
  payload: Element['type']
}

export interface DeleteElementAction {
  type: 'DELETE_ELEMENT'
  payload: string // id
}

export interface SelectElementAction {
  type: 'SELECT_ELEMENT'
  payload: string // id
}

export interface LayoutsChangeAction {
  type: 'LAYOUTS_CHANGE'
  payload: Dashboard['layouts']
}

export interface ElementsChnageAction{
  type: 'ELEMENTS_CHANGE',
  payload: Dashboard['elements']
}

export interface CanvasMouseDownAction {
  type: 'CANVAS_MOUSE_DOWN'
}

export interface UpdateStateAction {
  payload: any
  type: 'INIT_STATE'
}

export interface WorkBookInfo {
  payload: Object,
  type: 'WORKBOOK_INFO_CHANGE'
}

export interface SetProject {
  payload: Object,
  type: 'SET_PROJECT'
}

export interface SetModular {
  payload: Object,
  type: 'SET_MODULAR'
}

export interface SetPage {
  payload: Object,
  type: 'SET_PAGE'
}

export interface SetEnvChoose {
  payload: String,
  type: 'SET_ENV_CHOOSE'
}

export interface SetEnvs {
  payload: Array<Object>,
  type: 'SET_ENVS'
}

export type Action =
  | AddElementAction
  | DeleteElementAction
  | LayoutsChangeAction
  | SelectElementAction
  | CanvasMouseDownAction
  | UpdateStateAction
  | ElementsChnageAction
  | WorkBookInfo
  | SetProject
  | SetModular
  | SetPage
  | SetEnvChoose
  | SetEnvs
