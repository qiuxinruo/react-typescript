import React from 'react'
import { Tooltip } from 'antd'
import { useDrag } from 'react-dnd'

const DragMeaItem =  (props) => {
    const { dataItem, getData } = props
    const [, drag] = useDrag({ 
        item: { type: 'drop',data:{...dataItem}},
    })

    return (
        <div ref={ drag } className='db_detail_dragitem'>
            <span className='db_detail_dragitem-meaIden'>123</span>
            <Tooltip title={dataItem.name} placement="topLeft">
                <span className='db_detail_dragitem-name'>{dataItem.name}</span>
            </Tooltip>
        </div>
    )
}

export default DragMeaItem