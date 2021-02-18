import React, { useState, useEffect } from 'react'
import { deepCopy } from '@/common/utils'
import Dimension from './components/dimension'
import Measures from './components/measures'
import Count from './components/count'
import DataSet from './components/dataSet'
import DataDisplay from './components/dataDisplay'
import Calculation from '@dashboard/view/detail/components/calculation'
import Screen from './components/screen'
import { queryDimensionMeasure, saveReport } from '@dashboard/service'
import { RouteParams } from '@dashboard/router'
import { useParams, useHistory } from 'react-router-dom'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@dashboard/store'
import { message } from 'antd'

export default () => {
  const { workbookId, dashboardId } = useParams<RouteParams>()
  const { elements, name, layouts, selectId, workBookInfo } = useSelector((state: State) => state)
  const history = useHistory()
  const dispatch = useDispatch()
  const [dataDisList, setDataDisList] = useState([])
  const [scrList, setScrList] = useState([])
  const [hoverIndex, setHoverItem] = useState(null)
  const [dimensions, setDimensions] = useState([])
  const [measures, setMeasures] = useState([])
  const [calculateFields, setCalculateFields] = useState([])
  const [showAdd,setShowAdd] = useState(false)
  const [countItem,setCountItem] = useState({})

  useEffect(() => {
    if (workBookInfo) {
      getDimensionMeasure()
    }
  }, [workBookInfo])

  useEffect(() => {
    if (selectId && elements[selectId]) {
      const newElement = deepCopy(elements[selectId])
      const { dimensions = [], measures = [], filters = [],calculateFields=[]  } = newElement
      const newList = dimensions.concat(measures).concat(calculateFields).sort((a, b) => { return a.sortId - b.sortId })
      setDataDisList(newList)
      setScrList(filters)
    } else {
      setDataDisList([])
      setScrList([])
    }
  }, [selectId])

  const getDimensionMeasure = () => { // 获取维度与度量
    const newWorkBookInfo = deepCopy(workBookInfo)
    queryDimensionMeasure({ setId: newWorkBookInfo.dataSetId }).then(res => {
      console.log(res)
      if (res.success) {
        setDimensions(res.data.dimensions)
        setMeasures(res.data.measures)
        setCalculateFields(res.data.calculateFields)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const getSame = (item, array) => {
    console.log(item)
    let isTrue = false
    array.forEach(element => {
      if(element.calculateId){
        if (element.calculateId === item.calculateId ) {
          isTrue = true
        }
      }else {
        if (element.field === item.field ) {
          isTrue = true
        }
      }
    });
    return isTrue
  }

  const onDrop = (e1, e2) => { //拖拽放下
    if (!selectId) {
      message.warning('请先选中一个图表')
      return false
    }
    if (e2 == 'dataDisplay') {
      const isTrue = getSame(e1.data, dataDisList)
      if (!isTrue) {
        let dataItem = e1.data
        if(dataItem.fieldType==='number'||dataItem.expression){
          dataItem.format = ''
        }
        let list = dataDisList.concat([{ ...dataItem }])
        const newList = list.map((item, index) => {
          return {
            ...item,
            sortId: index,
            columnName: 'column' + index
          }
        })
        saveReportHandle(newList, scrList)
        setDataDisList(newList)
      } else {
        message.warning('请勿重复添加')
      }
    } else {
      const isTrue = getSame(e1.data, scrList)
      if (!isTrue) {
        
        let list = [e1.data]
        list[0].operator = 'in'
        list[0].value = ''
        const newList = deepCopy(scrList).concat(list)
        setScrList(newList)
        saveReportHandle(dataDisList, newList)
      } else {
        message.warning('请勿重复添加')
      }
    }
  }

  const saveReportHandle = (list, filterList) => { //保存数据
    const newDimension = list.filter(item => !item.function&&!item.expression)
    const newMeasure = list.filter(item => item.function)
    const  calculateFields= list.filter(item =>item.expression)
    const newElement = {
      ...elements[selectId],
      dimensions: newDimension,
      measures: newMeasure,
      filters: filterList,
      calculateFields: calculateFields
    }
    let newElements = deepCopy(elements)
    newElements[selectId] = newElement
    saveReport({
      name: name,
      layouts: JSON.stringify(layouts),
      elements: JSON.stringify(newElements),
      workBookId: workbookId,
      reportId: dashboardId
    }).then(res => {
      if (res.success) {
        dispatch({
          type: 'INIT_STATE',
          payload: {
            name: name,
            layouts: layouts,
            elements: newElements
          }
        })
      } else {
        if (res.code == 'A1010') {
          history.replace('/dashboard/workbook')
        }
      }
    })
  }

  const updateList = (e) => { //更新数据展示列数据
    setDataDisList(e)
    saveReportHandle(e, scrList)
  }

  const updateListScr = (e) => {
    setScrList(e)
    saveReportHandle(dataDisList, e)
  }

  const editCountItem=(e)=> {
    setShowAdd(true)
    setCountItem(e)
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <aside className="db_detail_sider">
          <div className="db_detail_sider-left">
            <DataSet />
            <Dimension list={dimensions} />
            <Measures list={measures} />
            <Count editCountItem={e=>editCountItem(e)} list={calculateFields} openAdd={()=>{setShowAdd(true);setCountItem({})}} updata={()=>getDimensionMeasure()}/>
          </div>
          <div className="db_detail_sider-right">
            <DataDisplay
              onDrop={(e1: any, e2: String) => onDrop(e1, e2)}
              list={dataDisList}
              updateList={e => updateList(e)}
            />
            <Screen
              onDrop={(e1, e2) => onDrop(e1, e2)}
              list={scrList}
              updateListScr={e => updateListScr(e)}
            />
          </div>
        </aside>
      </DndProvider>
      {
        showAdd &&  <Calculation countItem={countItem} closeAdd={()=>{setShowAdd(false);getDimensionMeasure()}} measures={measures} dimensions={dimensions}/>
      }
    </div>
  )
}
