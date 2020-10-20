import React, { useEffect, useState } from 'react'

import Search from './components/search'
import Table from './components/table'
import { queryList } from '@dashboard/service'
import './index.less'

export default () => {
    const [data, setData] = useState([])
    const [keyWordQUERY, setKeyWordQUERY] = useState('')

    useEffect(()=> {
        getList()
    },[keyWordQUERY])

    const getList =()=> {
        queryList({keyWordQUERY:keyWordQUERY}).then(res=> { 
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
            
        </div>
    )
}