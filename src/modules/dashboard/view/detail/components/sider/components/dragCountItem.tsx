import React from 'react'
import { Tooltip, Dropdown, Menu, message } from 'antd'
import { useDrag } from 'react-dnd'
import { deleteCalculate } from '@dashboard/service'
import { CaretDownOutlined } from '@ant-design/icons';

const DragCountItem = (props) => {
    const { dataItem, getData,updata,editCountItem } = props

    const [, drag] = useDrag({
        item: { type: 'drop', data: { ...dataItem } },
    })

    const deleteCount=()=> {
        deleteCalculate({
            calculateId: dataItem.calculateId
        }).then(res=> {
            if(res.success){
                message.success('删除成功')
                updata()
            }else{
                console.log(res)
            }
        }).catch(err=> {
            console.log(err)
        })
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <span onClick={()=>editCountItem(dataItem)}>
                    修改计算字段
                </span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={()=>deleteCount()}>
                    删除
                </span>
            </Menu.Item>
        </Menu>
    )

    return (
        <div ref={drag} className='db_detail_dragitem'>
            <span className='db_detail_dragitem-meaIden'>fx</span>
            <Tooltip title={dataItem.name} placement="topLeft">
                <span className='db_detail_dragitem-name'>{dataItem.name}</span>
            </Tooltip>
            <span className='db_detail_dragitem-dropdown'>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <CaretDownOutlined />
                    </a>
                </Dropdown>
            </span>
        </div>
    )
}

export default DragCountItem