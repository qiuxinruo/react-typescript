import { uuid } from '@/common/utils'

import { Element, Dashboard } from '@dashboard/models'

export function addElement(dashboard: Dashboard, type: Element['type']) {
  const id = uuid()
  const laylout = { i: id, x: 0, y: 0, w: 3, h: 5, minW: 3, minH: 5 }
  const element = { id, type, name: '新的表格' }

  dashboard.elements[id] = element
  dashboard.layouts.push(laylout)
}
