import React,{ useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { RouteParams } from '@dashboard/router'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import { deepCopy } from '@/common/utils'
import { pageList } from '@dashboard/service'

import Search from '@/modules/dashboard/components/Search'
import Table from '@dashboard/view/dotSafeguard/components/pageTable'
import BreadCrum from '@dashboard/components/breadCrum'

import './index.less'
import { message } from 'antd'

export default () => {
    const { projectId,modularId } = useParams<RouteParams>()
    const { project,modular } = useSelector((state: State) => state)
    const history = useHistory()
    const [list, setList] = useState([])
    const [page, setPage] = useState({
        pageNameLike: '',
        moduleId: modularId,
        pageIndex: 1,
        pageSize: 10
    })
    const [totalCount,setTotalCount] = useState(0)
    const [breadList, setBreadList] = useState([])

    useEffect(()=> {
        if(project){
            setBreadList([
                {
                    name: '打点中心',
                    url: '/dashboard/dotsafeguard',
                },
                {
                    name: deepCopy(project).name,
                    url: `/dashboard/project/${projectId}`
                },
                {
                    name: deepCopy(modular).name,
                    url: ''
                },
            ])
            getList(page)
        }else {
            history.push('/dashboard/dotsafeguard')
        }
    },[page])

    const getList =(param) => {
        pageList({...param}).then(res=> {
            if(res.success){
                setList(res.data.rows)
                setTotalCount(res.data.totalCount)
            }else {
                message.warning(res.msg)
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
            <Search handleSearch={(e) => {setPage({...page,pageNameLike:e,pageIndex:1})}} placeholderText={'请输入页面名称'} />
        </div>
        <div className='db_dot_project-table'>
            <Table list={list} updataList={updataList} totalCount={totalCount} page={page} changePages={(index,size)=>changePages(index,size)}/>
        </div>
    </div>
}