import React, { useState } from 'react'
import { Table as AntTable, Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { RouteParams } from '@dashboard/router'
import AddModular from './addModular'

export default () => {
    const { projectId } = useParams<RouteParams>()
    const [modalShow, setShow] = useState(false)
    const [list, setList] = useState([
        {
            name: '日程',
            userName: '邱欣若',
            code: 'EWQD',
            modularId: 11,
        },
        {
            name: '工作报告',
            userName: '邱欣若',
            code: 'EWQD',
            modularId: 12,
        },
        {
            name: '日程',
            userName: '邱欣若',
            code: 'EWQD',
            modularId: 13,
        },
    ])
    const columns = [
        {
            title: '模块',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <Link to={`/dashboard/modular/${projectId}/${record.modularId}`}>{text}</Link>
            }
        },
        {
            title: '发布人',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '模块编码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <Link to={`/dashboard/modular/${projectId}/${record.modularId}`}> 查看</Link>
                    <span>编辑</span>
                    <span>删除</span>
                </div>
            }
        },
    ]
    const closeModal = () => {
        setShow(false)
    }

    return <div className='db_dot_table'>
        <Button className='db_dot_table-btn'>新建模块</Button>
        <AntTable columns={columns} dataSource={list} rowKey={record => record.modularId} />
        {
            modalShow && <AddModular closeModal={() => closeModal()} />
        }
    </div>
}