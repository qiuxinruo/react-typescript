import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@dashboard/store'
import { deepCopy } from '@/common/utils'
import { Tooltip } from 'antd'
const DataSet = (props) => {
    const { workBookInfo } = useSelector((state: State) => state)

    return (
        <div className='db_detail_dataset'>
            <span className='db_detail_dataset-name'>数据集</span>
            <Tooltip title={workBookInfo ? deepCopy(workBookInfo).dataSetCubeName : ''}>
                <div className='db_detail_dataset-dataname'>{workBookInfo ? deepCopy(workBookInfo).dataSetCubeName : ''}</div>
            </Tooltip>
        </div>
    )
}

export default DataSet