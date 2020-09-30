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

export interface CanvasMouseDownAction {
  type: 'CANVAS_MOUSE_DOWN'
}

export type Action =
  | AddElementAction
  | DeleteElementAction
  | LayoutsChangeAction
  | SelectElementAction
  | CanvasMouseDownAction
