import React, { useState } from 'react'
import DragMeaItem from './dragMeaItem'

export default (props)=> {
    const { list } = props
    return (
        <div className='db_detail_measures'>
            <span className='db_detail_measures-name'>度量</span>
            <div className='db_detail_measures-content'>
                {
                    list.map((item,index)=> {
                        return <DragMeaItem key={index} dataItem={item} getData='measures'/>
                    })
                }
            </div>
        </div>
    )
}