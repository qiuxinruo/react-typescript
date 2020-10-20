import React from 'react'

import { useDrag } from 'react-dnd'

const DragMeaItem =  (props) => {
    const { dataItem, getData } = props
    const [, drag] = useDrag({ 
        item: { type: 'drop',data:{...dataItem}},
    })

    return (
        <div ref={ drag } className='db_detail_dragitem'>
            <span className='db_detail_dragitem-meaIden'>123</span>{dataItem.name}
        </div>
    )
}

export default DragMeaItem