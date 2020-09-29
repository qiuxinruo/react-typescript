import React from 'react'
import { Table as AntTable } from 'antd'

import { Table } from '@dashboard/models'

import Conatainer from './container'

export default ({ data }: { data: Table }) => {
  return (
    <Conatainer data={data}>
      <AntTable />
    </Conatainer>
  )
}
