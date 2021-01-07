import React, { useState } from 'react'
import DragCountItem from './dragCountItem'
import { PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default (props) => {
    const { list,openAdd,updata,editCountItem } = props
    return (
        <div className='db_detail_count'>
            <span className='db_detail_count-name'>计算字段</span>
            <span className='db_detail_count-add'>
                <PlusOutlined onClick={()=>openAdd()}/>
            </span>
            <div className='db_detail_count-content'>
                {
                    list.map((item, index) => {
                        return <DragCountItem 
                            updata={()=>updata()}
                            key={index}
                            dataItem={item}
                            getData='count'
                            editCountItem={(e)=>editCountItem(e)}
                        />
                    })
                }
            </div>
        </div>
    )
}