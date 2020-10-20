import React, { useRef, useState } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { CloseOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import classnames from 'classnames'
import { deepCopy } from '@/common/utils'

interface chilProps {
    onDrop: Function,
    list: any[],
    updateList: Function
}

let hoverItem = null

const DragItem = (props) => {
    const ref = useRef(null)
    const { item, dataDisdel, itemIndex, moveCard, hoverIndex, setHoverItem, changeName } = props
    const [, drag] = useDrag({
        item: { type: 'card', index: itemIndex },
        //拖动结束标志线至空
        end(monitor) {
            setHoverItem(null)
        }
    })

    const [{ isOver }, drop] = useDrop({
        accept: ['card'],
        drop(item, monitor) {
            if (!ref.current) {
                return
            }
            const hoverIndex = itemIndex
            moveCard(item, hoverIndex)
            setHoverItem(null)
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            setHoverItem(itemIndex)
        }
    })
    drag(drop(ref))
    return <div ref={ref}
        className={classnames(!item.function ? 'db_detail_datadisplay-ditem' : 'db_detail_datadisplay-mitem', hoverIndex == itemIndex ? 'db_detail_datadisplay-hovBor' : 'db_detail_datadisplay-nohovBor')}>
        <Input
            onChange={e => changeName(e.target.value, itemIndex)}
            className={!item.function ? 'db_detail_datadisplay-dspan' : 'db_detail_datadisplay-mspan'}
            value={!item.function? item.alias : item.name}
        />
        <CloseOutlined
            className='db_detail_datadisplay-icon'
            onClick={() => dataDisdel(itemIndex)}
        />
    </div>
}

const DataDisplay: React.FC<chilProps> = (props) => {
    const { onDrop, list, updateList } = props
    const [hoverIndex, setHoverItem] = useState(null)

    const changeName = (e, e1) => {
        let newList = deepCopy(list)
        if (!newList[e1].function) {
            newList[e1].alias = e
        } else {
            newList[e1].name = e
        }
        updateList(newList)
    }

    const moveCard = (e, e1) => { //数据展示列排序
        const lists = deepCopy(list)
        const dragData = lists[e.index]
        lists.splice(e.index, 1)//删除旧的行
        lists.splice(e1, 0, dragData);//插入新的行
        const newList = lists.map((item, index) => {
            return {
                ...item,
                sortId: index,
                columnName: 'column' + index
            }
        })
        updateList(newList)
    }

    const dataDisdel = (e) => { //删除数据展示列
        let lists = deepCopy(list)
        lists.splice(e, 1)
        const newList = lists.map((item,index)=> {return {...item,sortId:index,columnName: 'column'+index}})
        updateList(newList)
      }

    const [{ isOver, isOverCurrent }, drop] = useDrop({
        accept: 'drop',
        drop(item, monitor) {
            onDrop && onDrop(item, 'dataDisplay')
        },
    })

    return (
        <div className='db_detail_datadisplay'>
            <span className='db_detail_datadisplay-name'>数据展示</span>
            <div className='db_detail_datadisplay-wrap' ref={drop}>
                {
                    list.map((item, index) => {
                        return <DragItem
                            item={item}
                            key={index}
                            itemIndex={index}
                            hoverIndex={hoverIndex}
                            dataDisdel={(e) => dataDisdel(e)}
                            setHoverItem={(e) => setHoverItem(e)}
                            moveCard={(e: Object, e1: Number) => moveCard(e, e1)}
                            changeName={(e, e1) => changeName(e, e1)}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default DataDisplay