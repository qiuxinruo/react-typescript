import React from 'react'
import { Link } from 'react-router-dom'
import Search from '@/modules/dashboard/components/Search'
import Table from '@dashboard/view/dotSafeguard/components/eventTable'

import './index.less'

export default () => {
    const setKeyWordQUERY = (e) => {

    }
    return <div className='db_dot_project'>
        <div className='db_dot_project-header'>
            <Link to='/dashboard/dotsafeguard'><span className='db_dot_project-headerBtn'>
            </span></Link>
                打点中心 / <Link to=''><span className='db_dot_project-headerBtn'>
                打点中心
            </span></Link>
                打点中心 / <Link to=''><span className='db_dot_project-headerBtn'>
                打点中心
            </span></Link> /  
            浙江彩云
        </div>
        <div className='db_workbook_search'>
            <Search handleSearch={(e) => setKeyWordQUERY(e)} placeholderText={'请输入打点事件名称'} />
        </div>
        <div className='db_dot_project-table'>
            <Table />
        </div>
    </div>
}