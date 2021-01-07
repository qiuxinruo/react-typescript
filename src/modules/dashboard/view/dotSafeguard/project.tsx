import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import { deepCopy } from '@/common/utils'
import { moduleList } from '@dashboard/service'
import { RouteParams } from '@dashboard/router'

import Search from '@/modules/dashboard/components/Search'
import Table from '@dashboard/view/dotSafeguard/components/modularTable'
import BreadCrum from '@dashboard/components/breadCrum'

import './index.less'

export default () => {
    const { project,env_choose } = useSelector((state: State) => state)
    const { projectId } = useParams<RouteParams>()
    const history = useHistory()
    const [page,setPage] = useState({
        moduleNameLike: '',
        projectId: projectId,
        pageIndex: 1,
        pageSize: 10,
    })
    const [list,setList] = useState([])
    const [totalCount,setTotalCount] = useState(0)
    const [breadList, setBreadList] = useState([])

    useEffect(()=> {
        if(!project){
            history.push('/dashboard/dotsafeguard')
        }else {
            setBreadList([
                {
                    name: '打点中心',
                    url: '/dashboard/dotsafeguard',
                },
                {
                    name: deepCopy(project).name,
                    url: ''
                },
            ])
            getList(page)
        }
    },[page])

    const getList=(param)=> {
        moduleList({...param}).then(res=> {
            if(res.success){
                setList(res.data.rows)
                setTotalCount(res.data.totalCount)
            }
        })
    }

    const updataList=()=> {
        getList(page)
    }

    const changePages=(index,size)=> {
        setPage({
            ...page,
            pageIndex:index,
            pageSize:size
        })
    }

    return <div className='db_dot_project'>
        <BreadCrum bread={breadList}/>
        <div className='db_workbook_search'>
            <Search handleSearch={(e) => {setPage({...page,moduleNameLike:e,pageIndex:1})}} placeholderText={'请输入模块名称'} />
        </div>
        <div className='db_dot_project-table'>
            <Table list={list} updataList={()=>updataList()} totalCount={totalCount} page={page} changePages={(index,size)=>changePages(index,size)}/>
        </div>
    </div>
}