import immer from 'immer'

import { uuid } from '@/common/utils'

import { Element, Dashboard } from '@dashboard/models'

export function addElement(dashboard: Dashboard, type: Element['type']) {
  const id = uuid()
  const laylout = { i: id, x: 0, y: 0, w: 3, h: 5, minW: 2, minH: 2 }
  const element = { id, type, name: '新的表格' }

  dashboard.elements[id] = element
  dashboard.layouts.push(laylout)
}

export function deleteElement(dashboard: Dashboard, id: string) {
  delete dashboard.elements[id]
  dashboard.layouts = dashboard.layouts.filter(it => it.i !== id)
}
