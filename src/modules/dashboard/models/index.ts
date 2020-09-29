import { Layout } from 'react-grid-layout'

export interface Element {
  id: string
  type: 'Table'
  name: string
}

export interface Table extends Element {
  type: 'Table'

  // deimensions: any // 维度
  // measures: any // 度量
  // conditions: any // 过滤条件
}

export interface Dashboard {
  name: string
  dataSource: string
  elements: {
    [key: string]: Element
  }
  layouts: Layout[]
}
