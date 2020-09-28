import { Element, Point } from '@engine/models'

//flow相关
export interface FlowMouseDown {
  type: 'FLOW_MOUSE_DOWN'
  payload: string
}

export interface FlowAsideMouseDown {
  type: 'FLOW_SIDE_MOUSE_DOWN'
}

export interface FlowAsideDragging {
  type: 'FLOW_ASIDE_DRAGGING'
  payload: number
}

export interface PointMouseDownAction {
  type: 'POINT_MOUSE_DOWN'
  payload: {
    points: [number, number, number, number]
    source: {
      id: string
      point: 'left' | 'right'
    }
  }
}

export interface PointDraggingAction {
  type: 'POINT_DRAGGING'
  payload: {
    x: number
    y: number
    pointOf: string
    point: 'left' | 'right'
  }
}

export interface PointDropAction {
  type: 'POINT_DROP'
}

// node 相关
export interface NodeMouseDownAction {
  type: 'NODE_MOUSE_DOWN'
  payload: string
}

export interface NodeDraggingAction {
  type: 'NODE_DRAGGING'
  payload: [number, number]
}

export interface NodeDropAction {
  type: 'NODE_DROP'
}

// 全局相关
export interface NodeClickAction {
  type: 'NODE_CLICK'
  payload: string
}

export interface SVGMouseDownAction {
  type: 'SVG_MOUSE_DOWN'
}

export interface NextButtonMouseDown {
  type: 'NEXT_BUTTON_MOUSE_DOWN'
  payload: string
}

export interface ContextMenuClick {
  type: 'CONTEXT_MENU_CLICK'
  payload: 'Approval' | 'Agency' | 'End'
}

export interface SVGDraggingAction {
  type: 'SVG_DRAGGING'
  payload: [number, number]
}

export interface WindowKeyDownAction {
  type: 'WINDOW_KEY_DOWN'
  payload: KeyboardEvent
}

export interface SVGMouseWheel {
  type: 'SVG_MOUSE_WHEEL'
  payload: number
}

export interface StartSelectAction {
  type: 'START_SELECT'
  payload: [number, number]
}

export interface SelectingAction {
  type: 'SELECTING'
  payload: [number, number]
}

export interface SelectEnd {
  type: 'SELECT_END'
}

// 异步
export interface InitElementsAction {
  type: 'INIT_ELEMENTS'
  payload: { [Key: string]: Element }
}

export type Action =
  | NodeMouseDownAction
  | NodeDraggingAction
  | NodeDropAction
  | NextButtonMouseDown
  | SVGMouseDownAction
  | ContextMenuClick
  | PointMouseDownAction
  | PointDraggingAction
  | PointDropAction
  | InitElementsAction
  | FlowMouseDown
  | WindowKeyDownAction
  | SVGDraggingAction
  | FlowAsideMouseDown
  | FlowAsideDragging
  | SVGMouseWheel
  | StartSelectAction
  | SelectingAction
  | SelectEnd
  | NodeClickAction
