import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { State } from '@dashboard/store'

const DataSet = (props) => {
    const { dataSetCubeName } = useSelector((state: State) => state)
    return (
        <div className='db_detail_dataset'>
            <span className='db_detail_dataset-name'>数据集</span>
            <div className='db_detail_dataset-dataname'>{dataSetCubeName}</div>
        </div>
    )
}

export default DataSet