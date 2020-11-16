import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import { deepCopy } from '@/common/utils'
import { eventList } from '@dashboard/service'

import Search from '@/modules/dashboard/components/Search'
import Table from '@dashboard/view/dotSafeguard/components/eventTable'
import BreadCrum from '@dashboard/components/breadCrum'
import {RouteParams} from '@dashboard/router'

import './index.less'
import { message } from 'antd'

export default () => {
    const { projectId,modularId,pageId } = useParams<RouteParams>()
    const { project, modular, page,  } = useSelector((state: State) => state)
    const history = useHistory()
    const [param, setParam] = useState({
        eventDescLike: '',
        pageId: pageId,
        pageIndex: 1,
        pageSize: 10
    })
    const [list,setList] = useState([])
    const [totalCount,setTotalCount] = useState(0)
    const [breadList, setBreadList] = useState([])

    useEffect(()=> {
        getList(param)
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
                    url:`/dashboard/modular/${projectId}/${modularId}`
                },
                {
                    name:  deepCopy(page).name,
                    url:''
                }
            ])
        }else {
            history.push('/dashboard/dotsafeguard')
        }
    },[param])

    const getList=(e)=> {
        eventList({...e}).then(res=> {
            if(res.success){
                setList(res.data.rows)
                setTotalCount(res.data.totalCount)
            }else {
                message.error(res.msg)
            }
        })
    }

    const updataList=()=> {
        getList(param)
    }

    const changePages=(index,size)=> {
        setParam({
            ...param,
            pageIndex:index,
            pageSize:size
        })
    }

    return <div className='db_dot_project'>
        <BreadCrum bread={breadList}/> 
        <div className='db_workbook_search'>
            <Search handleSearch={(e) => {setParam({...param,eventDescLike:e,pageIndex:1})}} placeholderText={'请输入打点事件名称'} />
        </div>
        <div className='db_dot_project-table'>
            <Table list={list} updataList={()=>updataList()} totalCount={totalCount} param={param} changePages={(index,size)=>changePages(index,size)}/>
        </div>
    </div>
}