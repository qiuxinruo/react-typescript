import React, { useState } from 'react'
import { Table as AntTable, Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'
import AddPage from './addPage'
import { RouteParams } from '@dashboard/router'

export default () => {
    const { projectId, modularId } = useParams<RouteParams>()
    const [modalShow, setShow] = useState(false)
    const [list, setList] = useState([{
        name: '首页',
        userName: '邱欣若',
        projectCode: '1234',
        pageCode: '5678',
        pageId: 1
    }, {
        name: '首页1',
        userName: '邱欣若',
        projectCode: '1234',
        pageCode: '5678',
        pageId: 2
    }, {
        name: '首页2',
        userName: '邱欣若',
        projectCode: '1234',
        pageCode: '5678',
        pageId: 3
    }, {
        name: '首页3',
        userName: '邱欣若',
        projectCode: '1234',
        pageCode: '5678',
        pageId: 4
    },]
    )
    const columns = [
        {
            title: '页面',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <Link to={`/dashboard/page/${projectId}/${modularId}/${record.pageId}`}>{text}</Link>
            }
        },
        {
            title: '发布人',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '模块编码',
            dataIndex: 'projectCode',
            key: 'projectCode'
        },
        {
            title: '页面编码',
            dataIndex: 'pageCode',
            key: 'pageCode'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <Link to={`/dashboard/page/${projectId}/${modularId}/${record.pageId}`}><span className={classnames('db_dot_table-tableBtn')}>查看</span></Link>
                    <span className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>编辑</span>
                    <span className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>删除</span>
                </div>
            }
        },
    ]
    const closeModal = () => {
        setShow(false)
    }

    return <div className='db_dot_table'>
        <Button className='db_dot_table-btn' type='primary'>新建页面</Button>
        <AntTable columns={columns} dataSource={list} rowKey={record => record.pageId} />
        {
            modalShow && <AddPage closeModal={() => closeModal()} />
        }
    </div>
}