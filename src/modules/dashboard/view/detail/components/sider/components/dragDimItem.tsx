import React from 'react'
import { useDrag } from 'react-dnd'

const DragDimItem =  (props) => {
    const { dataItem,getData} = props
    const [, drag] = useDrag({ 
        item: { type: 'drop',data:{...dataItem}}
    })
    return (
        <div ref={ drag } className='db_detail_dragitem'>
            <span className='db_detail_dragitem-dimIden'>ABC</span>{dataItem.alias}
        </div>
    )
}

export default DragDimItem