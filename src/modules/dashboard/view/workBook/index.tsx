import React, { useEffect, useState } from 'react'
import Loading from '@dashboard/components/loading'
import Search from '@dashboard/components/Search'
import Table from './components/table'
import { Select } from 'antd'
import { queryList } from '@dashboard/service'
import { CREAT_TYPE } from '@dashboard/constant'
import './index.less'

const { Option } = Select;

export default () => {
    const [data, setData] = useState([])
    const [keyWord, setKeyWord] = useState('')
    const [type, setType] = useState(1)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getList()
    }, [keyWord,type])

    const changeType=(e)=> {
        setType(e)
    }

    const getList = () => {
        setLoading(true)
        queryList({ keyWord: keyWord,type:type }).then(res => {
            setLoading(false)
            if (res.success) {
                setData(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const updateList = () => {
        getList()
    }

    return (
        <div className='db_workbook_index'>
            <div className='db_workbook_index-header'>
                工作簿
            </div>
            <div className='db_workbook_search'>
                <Search handleSearch={(e) => setKeyWord(e)} placeholderText="搜索工作簿" />
            </div>
            <Select value={type} style={{ width: 120 }} onChange={e=>changeType(e)}>
                {
                    CREAT_TYPE.map(item => {
                        return <Option value={item.value}>{item.text}</Option>
                    })
                }
            </Select>
            <div className='db_workbook_table'>
                <Table data={data} updateList={() => updateList()} />
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}