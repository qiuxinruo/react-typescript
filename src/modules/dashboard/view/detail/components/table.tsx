import React, { useEffect, useState } from 'react'
import { Table as AntTable } from 'antd'

import { Table } from '@dashboard/models'
import { deepCopy } from '@/common/utils'
import { getReportData } from '@dashboard/service'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@dashboard/store'

import Conatainer from './container'

export default ({ data }: { data: Table }) => {
  const { dataSetId } = useSelector((state: State) => state)
  const [columns, setColumns] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [loading,setLoading] = useState(false)
  console.log(dataSetId, 'dataSetId')
  useEffect(() => {
    getList({
    })
  }, [data, dataSetId])

  const getList = (param) => {
    let newData = deepCopy(data)
    const { dimensions = [], measures = [], filters = [] } = newData
    const newList = dimensions.concat(measures).sort((a, b) => { return a.sortId - b.sortId })
    getColums(newList)
    setLoading(true)
    getReportData({
      chartType: 'grid',
      dataSetId: dataSetId,
      orderInfo: param,
      dimensions: dimensions.map(item => {
        delete item.sortId
        return item
      }),
      measures: measures.map(item => {
        delete item.sortId
        return item
      }),
      filters: filters.map(item => {
        return item
      })
    }).then(res => {
      setLoading(false)
      if (res.success) {
        const list = res.data.map((item, index) => {
          return {
            ...item,
            itemId: index
          }
        })
        setDataSource(list)
      }
    })
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter)
    let param = !sorter.order?{} : {
      columnName:sorter.field,
      orderParam: sorter.order=='ascend' ? 0 : 1
    }
    getList(param)
  }

  const getColums = (list) => {
    const newColumns = list.map(item => {
      return {
        title: !item.function ? item.alias : item.name,
        key: item.columnName,
        dataIndex: item.columnName,
        sorter: true,
      }
    })
    setColumns(newColumns)
  }

  return (
    <Conatainer data={data}>
      <AntTable loading={loading} columns={columns} dataSource={dataSource} rowKey={record => record.itemId} onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)} />
    </Conatainer>
  )
}
