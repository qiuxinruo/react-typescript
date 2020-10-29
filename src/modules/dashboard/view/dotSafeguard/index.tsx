import React from 'react'

import Search from '@/modules/dashboard/components/Search'

import './index.less'

export default () => {
    const setKeyWordQUERY=(e)=> {
        console.log(e)
    }
    return (<div className='db_dot_index'>
        <div className='db_dot_index-header'>
            打点维护
        </div>
        <div className='db_workbook_search'>
            <Search handleSearch={(e) => setKeyWordQUERY(e)} placeholderText={'请输入打点项目'}/>
        </div>
    </div>)
}