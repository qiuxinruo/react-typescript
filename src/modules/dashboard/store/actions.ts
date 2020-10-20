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

export interface SaveDataSetCubeName {
  payload: string
  type: 'SAVE_DATASET_CUBE_NAME'
}

export interface UpdateStateAction {
  payload: any
  type: 'INIT_STATE'
}

export interface DataSetIdAction {
  payload: Number,
  type: 'DATASET_ID_CHANGE'
}

export type Action =
  | AddElementAction
  | DeleteElementAction
  | LayoutsChangeAction
  | SelectElementAction
  | CanvasMouseDownAction
  | SaveDataSetCubeName
  | UpdateStateAction
  | ElementsChnageAction
  | DataSetIdAction
