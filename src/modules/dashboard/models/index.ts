import { Layout } from 'react-grid-layout'

// 数据集
export interface DataSet {}

// 元素
export interface Element {
  id: string
  type: 'Table'
  name: string
}

//表格
export interface Table extends Element {
  type: 'Table'

  // deimensions: any // 维度
  // measures: any // 度量
  // conditions: any // 过滤条件
}

// 仪表盘
export interface Dashboard {
  name: string
  dataSource: string
  elements: {
    [key: string]: Element
  }
  layouts: Layout[]
}
