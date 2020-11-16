import React, { useState } from 'react'
import { Input, Modal } from 'antd'
import { ZoomInOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'

import Edit from './edit'
export default () => {
    const [isShow, setShow] = useState(false)
    const [list, setList] = useState([
        {
            name: '利润',
            id: 'sum1'
        },
        {
            name: '销售额',
            id: 'sum2'
        },
        {
            name: '销售数量',
            id: 'sum3'
        },
        {
            name: '记录数',
            id: 'sum4'
        },
        {
            name: '利润1',
            id: 'sum5'
        },
    ])
    return <div className='db_detail_calculation'>
        <Modal
            closable={false}
            visible={true}
            width={800}
        >
            <div className='db_detail_calculation-wrap'>
                <div>指标名称<Input style={{ width: '300px', marginLeft: '20px' }} /></div>
                <div className='db_detail_calculation-content'>
                    <div className='db_detail_calculation-left'>
                        <Input placeholder="请输入" prefix={<ZoomInOutlined className='db_detail_calculation-searchIcon' />} />
                        <div>
                            {
                                !isShow ? <CaretDownOutlined className='db_detail_calculation-filedIcon' /> :
                                    <CaretUpOutlined className='db_detail_calculation-filedIcon' />
                            }数值字段（4)
                        </div>
                        <div className='db_detail_calculation-contain'>
                            {
                                list.map((item, index) => {
                                    return <div className='db_detail_calculation-item' key={index}>{item.name}</div>
                                })
                            }
                        </div>
                    </div>
                    <div className='db_detail_calculation-right'>
                        <Edit />
                    </div>
                </div>
            </div>
        </Modal>
    </div>
}