import React, { useEffect, useState } from 'react'
import { Table as AntTable } from 'antd'

import { Table } from '@dashboard/models'
import { deepCopy } from '@/common/utils'
import { getReportData } from '@dashboard/service'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@dashboard/store'

import Conatainer from './container'

export default ({ data }: { data: Table }) => {
  const { workBookInfo } = useSelector((state: State) => state)
  const [columns, setColumns] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [showError, setShowError] = useState(false)
  useEffect(() => {
    getList(null)
  }, [data, workBookInfo])

  const getList = (param) => {
    let newData = deepCopy(data)
    const { dimensions = [], measures = [], filters = [],calculateFields=[] } = newData
    const newList = dimensions.concat(measures).concat(calculateFields).sort((a, b) => { return a.sortId - b.sortId })
    const newFilters = filters.filter(item => item.operator && item.value)
    let newWorkInfo = deepCopy(workBookInfo)
    getColums(newList)
    setLoading(true)
    if (!dimensions.length && !measures.length && !calculateFields.length) {
      setLoading(false)
    } else {
      getReportData({
        chartType: 'grid',
        dataSetId: newWorkInfo.dataSetId,
        orderInfo: param,
        dimensions: dimensions.map(item => {
          delete item.sortId
          return item
        }),
        measures: measures.map(item => {
          delete item.sortId
          return item
        }),
        calculateFields: calculateFields.map(item=> {
          return item
        }),
        dimensionFilters: newFilters.filter(item=>!item.function&&!item.expression),
        measureFilters: newFilters.filter(item=>item.function),
        calculateFieldFilters: newFilters.filter(item=>item.expression)
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
          setShowError(false)
        } else {
          setDataSource([])
          setText(res.message)
          setShowError(true)
        }
      })
    }
  }

  const handleTableChange = (pagination, filters, sorter) => {
    let param = !sorter.order ? null : {
      columnName: sorter.field,
      orderParam: sorter.order == 'ascend' ? 0 : 1
    }
    getList(param)
  }

  const getColums = (list) => {
    const newColumns = list.map(item => {
      return {
        title: !item.function&&!item.expression ? item.alias : item.name,
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
      {
        showError && <div className='db_detail_container-textWrap'><span>{text}</span></div>
      }
    </Conatainer>
  )
}
