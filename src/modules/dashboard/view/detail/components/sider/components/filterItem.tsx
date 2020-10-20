import React, { useEffect, useState } from 'react'
import { Select, Input, Checkbox } from 'antd'
import { FILTER_TYPE, FILTER_HIGHT_ITEM, INPUT_TEXT } from '@dashboard/constant'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import { queryFieldValue } from '@dashboard/service'
import { deepCopy } from '@/common/utils'
const { Option } = Select

export default (props) => {
    const { item,updateItem } = props
    const { dataSetId } = useSelector((state: State) => state)
    const [filterType, setFilterType] = useState(undefined)
    const [filterHightType, setFilterHight] = useState(undefined)
    const [dataList, setDataList] = useState([])
    const [keyWord, setKeyWord] = useState('')
    const [firstValue,setFirstValue] = useState('')
    const [SecondValue,setSecondValue] = useState('')

    useEffect(()=> {
        if(item.operator){
            if(item.operator=='='||item.operator=='in'){
                setFilterType(1)
            }else {
                setFilterType(2)
                if(item.operator=='like'){
                    setFilterHight('containOperatorStrategy')
                    setFirstValue(item.value)
                }else {
                    setFilterHight('betweenOperatorStrategy')
                    setFirstValue(item.value?JSON.parse(item.value)[0]:'')
                    setSecondValue(item.value?JSON.parse(item.value)[1]:'')
                }
            }
        }
        getFieldValue('')
    },[item])

    const changeFilterType = (e) => {
        setFilterType(e)
    }

    const getFieldValue = (e) => {
        queryFieldValue({
            dataSetId: dataSetId,
            tableName: item.tableName,
            field: item.field,
            fieldType: item.fieldType,
            keyWord: e
        }).then(res => {
            if (res.success) {
                setDataList(res.data)
            }
            console.log(res)
        })
    }

    const getQueryList=(e)=> {
        setKeyWord(e)
        getFieldValue(e)
    }

    const changeValue=(e)=> {
        const newItem = deepCopy(item) 
        newItem.value = JSON.stringify(e)
        newItem.operator = 'in'
        updateItem(newItem)
    }

    const changeFirstValue=(e)=> {
        setFirstValue(e)
        let newItem = deepCopy(item)
        if(filterHightType=='betweenOperatorStrategy'){
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
        if(e=='containOperatorStrategy'){
            newItem.operator='like'
            newItem.value = ''
        }else {
            newItem.operator='between',
            newItem.value = ''
        }
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
                        FILTER_HIGHT_ITEM.map((item, index) => {
                            return <Option key={index} value={item.value}>{item.label}</Option>
                        })
                    }
                </Select>
            }
            {
                filterType == '2' && filterHightType
                &&<Input value={firstValue} className='db_detail_filterItem-search' onChange={e=>changeFirstValue(e.target.value)} placeholder={INPUT_TEXT[filterHightType]} />
            }
            {
                filterType == '2' &&  filterHightType == 'betweenOperatorStrategy' &&
                 <Input value={SecondValue} className='db_detail_filterItem-search' onChange={e=>changeSecondValue(e.target.value)} placeholder={INPUT_TEXT[filterHightType]} />
            }
        </div>
    )
}