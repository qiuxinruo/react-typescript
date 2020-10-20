import React, { useState } from 'react'
import DragDimItem from './dragDimItem'

const Dimension =(props)=> {
    const {list } = props
    return (
        <div className='db_detail_dimension'>
            <span className='db_detail_dimension-name'>维度</span>
            <div className='db_detail_dimension-content'>
                {
                    list.map((item,index)=> {
                        return <DragDimItem key={index} dataItem={item} getData='dimemsion'/>
                    })
                }
            </div>
        </div>
    )
}

export default Dimension