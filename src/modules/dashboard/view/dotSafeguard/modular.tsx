import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Search from '@/modules/dashboard/components/Search'
import Table from '@dashboard/view/dotSafeguard/components/pageTable'
import { RouteParams } from '@dashboard/router'

import './index.less'

export default () => {
    const { projectId } = useParams<RouteParams>()

    const setKeyWordQUERY = (e) => {
    }
    return <div className='db_dot_project'>
        <div className='db_dot_project-header'>
            <Link to='/dashboard/dotsafeguard'><span className='db_dot_project-headerBtn'>打点中心</span></Link> / <Link to={`/dashboard/project/${projectId}`}><span className='db_dot_project-headerBtn'>浙江移动</span></Link> / 日程</div>
        <div className='db_workbook_search'>
            <Search handleSearch={(e) => setKeyWordQUERY(e)} placeholderText={'请输入页面名称'} />
        </div>
        <div className='db_dot_project-table'>
            <Table />
        </div>
    </div>
}