import React, { useEffect, useState } from 'react'
import { Select, Input, Checkbox } from 'antd'
import { FILTER_TYPE, FILTER_HIGHT_ITEM, INPUT_TEXT,SECOND_INPUT } from '@dashboard/constant'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import { queryFieldValue,operatorList } from '@dashboard/service'
import { deepCopy } from '@/common/utils'
const { Option } = Select

export default (props) => {
    const { item,updateItem } = props
    const { workBookInfo } = useSelector((state: State) => state)
    const [filterType, setFilterType] = useState(undefined)
    const [filterHightType, setFilterHight] = useState(undefined)
    const [dataList, setDataList] = useState([])
    const [firstValue,setFirstValue] = useState('')
    const [SecondValue,setSecondValue] = useState('')
    const [operator,setOperator] = useState([])

    useEffect(()=> {
        if(item.operator){
            if(item.operator==='between'){
                setFirstValue(item.value?JSON.parse(item.value)[0]:'')
                setSecondValue(item.value?JSON.parse(item.value)[1]:'')
                setFilterType(2)
                setFilterHight('between')
            }else if(item.operator==='in'){
                setFilterType(1)
                setFirstValue(item.value)
                setFilterHight(item.operator)
            }else{
                setFirstValue(item.value)
                setFilterHight(item.operator)
                setFilterType(2)
            }
        }else {
            setFilterType(1)
            setFirstValue(item.value)
        }
        getFieldValue('')
        getOperatorList()
    },[])

    const changeFilterType = (e) => {
        setFilterType(e)
        setFirstValue('')
        setSecondValue('')
        updateItem({
            ...item,
            value:'',
            operator:e===1?'in': ''
        })
    }

    const getOperatorList=()=> {
        operatorList({}).then(res=> {
            setOperator(res.data)
        })
    }

    const getFieldValue = (e) => {
        const newWorkBookInfo = deepCopy(workBookInfo)
        queryFieldValue({
            dataSetId: newWorkBookInfo.dataSetId,
            tableName: item.tableName,
            field: item.field,
            fieldType: item.fieldType,
            keyWord: e
        }).then(res => {
            if (res.success) {
                setDataList(res.data)
            }
        })
    }

    const getQueryList=(e)=> {
        getFieldValue(e)
    }

    const changeValue=(e)=> {
        console.log(e)
        const newItem = deepCopy(item)
        newItem.value = !e.length?'':JSON.stringify(e)
        updateItem(newItem)
    }

    const changeFirstValue=(e)=> {
        setFirstValue(e)
        let newItem = deepCopy(item)
        if(filterHightType=='between'){
            newItem.value = JSON.stringify([e,SecondValue])
        }else {
            newItem.value = e
        }
        updateItem(newItem)
    }

    const changeSecondValue=(e)=> {
        setSecondValue(e)
        let newItem = deepCopy(item)
        newItem.value = JSON.stringify([firstValue,e])
        updateItem(newItem)
    }

    const changeHightOperator=(e)=> {
        setFilterHight(e)
        const newItem = deepCopy(item)
        newItem.operator = e
        newItem.value = ''
        updateItem(newItem)
    }

    return (

        <div className='db_detail_filterItem'>
            <Select onChange={(e) => changeFilterType(e)} value={filterType} placeholder='请选择' className='db_detail_filterItem-type' >
                {
                    FILTER_TYPE.map((item, index) => {
                        return <Option key={index} value={item.value}>{item.label}</Option>
                    })
                }
            </Select>
            {
                filterType == '1' && <Input className='db_detail_filterItem-search' placeholder='搜索' onChange={e => getQueryList(e.target.value)} />
            }
            {
                filterType == '1' &&<div className='db_detail_filterItem-checkGroup'>
                    <Checkbox.Group value={item.value?JSON.parse(item.value):[]}  onChange={(e)=>changeValue(e)}>
                        {
                            dataList.map((item, index) => {
                                return <div key={index}><Checkbox value={item}>{item}</Checkbox></div>
                            })
                        }
                    </Checkbox.Group>
                </div>

            }
            {
                filterType == '2' && <Select value={filterHightType} placeholder='请选择' className='db_detail_filterItem-type' onChange={e => changeHightOperator(e)}>
                    {
                        operator.map((item, index) => {
                            return <Option key={index} value={item.value}>{item.name}</Option>
                        })
                    }
                </Select>
            }
            {
                filterType == '2'
                &&<Input value={firstValue} className='db_detail_filterItem-search' onChange={e=>changeFirstValue(e.target.value)} placeholder={INPUT_TEXT[filterHightType]} />
            }
            {
                filterType == '2' && SECOND_INPUT.indexOf(filterHightType)>-1 &&
                 <Input value={SecondValue} className='db_detail_filterItem-search' onChange={e=>changeSecondValue(e.target.value)} placeholder={INPUT_TEXT[filterHightType]} />
            }
        </div>
    )
}