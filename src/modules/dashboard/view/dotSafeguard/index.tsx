import React, { useState, useEffect } from 'react'
import Search from '@/modules/dashboard/components/Search'
import Table from './components/projectTable'
import { State } from '@dashboard/store'
import { useSelector } from 'react-redux'
import './index.less'
import { projectList } from '@dashboard/service'

import { message } from 'antd'
import Cookies from 'js-cookie'

export default () => {
    const { project,modular } = useSelector((state: State) => state)
    const [page,setPage] = useState({
        pageIndex: 1,
        pageSize: 10,
        projectNameLike: '',
        prov: Cookies.get('env_choose')
    })
    const [totalCount,setTotalCount] = useState(0)
    const [list, setList] = useState([])

    useEffect(()=> {
        getList(page)
    },[page])

    const getList=(data)=> {
        projectList({
            ...data
        }).then(res=> {
            if(res.success){
                setList(res.data.rows)
                setTotalCount(res.data.totalCount)
            }else {
                message.warning(res.msg)
            }
        })
    }

    const updataList =()=> {
        getList(page)
    }

    const changePages=(index,size)=> {
        console.log(index,size)
        setPage({
            ...page,
            pageIndex:index,
            pageSize:size
        })
    }

    return (<div className='db_dot_index'>
        <div className='db_dot_index-header'>
            打点中心
        </div>
        <div className='db_workbook_search'>
            <Search handleSearch={(e) =>{setPage({...page,projectNameLike:e,pageIndex:1})}} placeholderText={'请输入打点项目'} />
        </div>
        <div className='db_dot_index-table'>
            <Table list={list} updataList={()=>updataList()} page={page} totalCount={totalCount} changePages={(index,size)=>changePages(index,size)}/>
        </div>
    </div>)
}