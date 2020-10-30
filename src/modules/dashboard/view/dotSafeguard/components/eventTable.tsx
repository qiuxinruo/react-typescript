import React from 'react'
import {Table as AntTable, Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { RouteParams } from '@dashboard/router'
import classnames from 'classnames'
export default ()=> {
    const { projectId, modularId, pageId } = useParams<RouteParams>()
    const columns = [
        {
            title: '打点事件',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <Link to={`/dashboard/page/${projectId}/${modularId}/${record.pageId}`}>{text}</Link>
            }
        },
        {
            title: '事件类型',
            dataIndex: 'type',
            key: 'type'
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
            title: '事件编码',
            dataIndex: 'eventCode',
            key: 'eventCode'
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
    return <div>
        <Button className='db_dot_table-btn' type='primary'>新建打点事件</Button>
        <AntTable columns={columns}/>
    </div>
}