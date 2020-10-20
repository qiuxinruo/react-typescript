import React, { useEffect, useState } from 'react'
import Loading from '@dashboard/components/loading'
import Search from './components/search'
import Table from './components/table'
import { queryList } from '@dashboard/service'
import './index.less'

export default () => {
    const [data, setData] = useState([])
    const [keyWordQUERY, setKeyWordQUERY] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        getList()
    },[keyWordQUERY])

    const getList =()=> {
        setLoading(true)
        queryList({keyWordQUERY:keyWordQUERY}).then(res=> {
            setLoading(false)
            if(res.success){
                setData(res.data)
            }
        }).catch(err=> {
            console.log(err)
        })
    }

    const updateList=()=> {
        getList()
    }

    return (
        <div className='db_workbook_index'>
            <div className='db_workbook_index-header'>
                工作簿
            </div>
            <div className='db_workbook_search'>
                <Search handleSearch={(e)=>setKeyWordQUERY(e)}/>
            </div>
            <div className='db_workbook_table'>
                <Table data={data} updataList={()=>updateList()}/>
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}