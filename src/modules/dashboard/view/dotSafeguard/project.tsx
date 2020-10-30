import React from 'react'
import { Link } from 'react-router-dom'

import Search from '@/modules/dashboard/components/Search'
import Table from '@dashboard/view/dotSafeguard/components/modularTable'

import './index.less'

export default () => {
    const setKeyWordQUERY = (e) => {

    }
    return <div className='db_dot_project'>
        <div className='db_dot_project-header'><Link to='/dashboard/dotsafeguard'>打点中心</Link> / 浙江彩云</div>
        <div className='db_workbook_search'>
            <Search handleSearch={(e) => setKeyWordQUERY(e)} placeholderText={'请输入模块名称'} />
        </div>
        <div className='db_dot_project-table'>
            <Table />
        </div>
    </div>
}