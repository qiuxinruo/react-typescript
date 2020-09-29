import { Element, Dashboard } from '@dashboard/models'

export interface AddElementAction {
  type: 'ADD_ELEMENT'
  payload: Element['type']
}

export interface SelectElementAction {
  type: 'SELECT_ELEMENT'
  payload: string
}

export interface LayoutsChangeAction {
  type: 'LAYOUTS_CHANGE'
  payload: Dashboard['layouts']
}

export type Action =
  | AddElementAction
  | LayoutsChangeAction
  | SelectElementAction
