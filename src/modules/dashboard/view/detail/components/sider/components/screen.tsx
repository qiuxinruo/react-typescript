import React from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { CloseOutlined } from '@ant-design/icons'

import { deepCopy } from '@/common/utils'
import FilterItem from './filterItem'
interface chilProps {
    onDrop: Function,
    list: any[],
    updateListScr: Function
}

const Screen: React.FC<chilProps> = (props) => {
    const { onDrop, list, updateListScr } = props
    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'drop',
        drop(item, monitor) {
            onDrop && onDrop(item, 'screen')
        },
        hover(item, monitor) {

        }
    })

    const updateItem = (item, index) => {
        const newList = deepCopy(list)
        newList[index] = item
        updateListScr(newList)
    }

    const delScreenItem = (index) => {
        const newList = deepCopy(list)
        newList.splice(index, 1)
        updateListScr(newList)
    }


    return (
        <div ref={drop} className='db_detail_screen'>
            <span className='db_detail_screen-name'>筛选器</span>
            <div className='db_detail_screen-content'>
                <div className='db_detail_screen-contentWrap'>
                    {
                        list.map((item, index) => {
                            return <div key={index} className='db_detail_screen-screenItem'>
                                <span className='db_detail_screen-screenName'>{item.alias}</span>
                                <CloseOutlined onClick={() => delScreenItem(index)} className='db_detail_screen-screenClose' />
                                <FilterItem item={item} itemIndex={index} updateItem={(e) => updateItem(e, index)} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Screen