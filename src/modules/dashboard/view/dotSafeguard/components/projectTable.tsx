import React, { useState } from 'react'
import { Table as AntTable, Button } from 'antd'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import AddProject from './addProject'

export default () => {
    const [modalShow, setShow] = useState(false)
    const [list,setList] = useState([
        {
            name: '浙江移动',
            userName:'邱欣若',
            project: '1111',
            id: 1,
        },
        {
            name: '湖南移动',
            userName:'邱欣若',
            project: '1111',
            id: 2,
        },
        {
            name: '河北移动',
            userName:'邱欣若',
            project: '1111',
            id: 3,
        },
    ])
    const columns = [
        {
            title: '项目',
            dataIndex: 'name',
            key: 'name',
            render:(text,record)=> {
                return  <Link to={`/dashboard/project/${record.id}`}><span>{text}</span></Link>
            }
        },
        {
            title: '发布人',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '版本信息',
            dataIndex: 'project',
            key: 'project'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render:(text, record)=> {
                return <div>
                    <Link to={`/dashboard/project/${record.id}`}><span className={classnames('db_dot_table-tableBtn')}>查看</span></Link>
                    <span className={classnames('db_dot_table-tableBtn','db_dot_table-edit')}>编辑</span>
                    <span className={classnames('db_dot_table-tableBtn','db_dot_table-edit')}>删除</span>
                </div>
            }
        },
    ]
    const closeModal = () => {
        setShow(false)
    }

        return <div className='db_dot_table'>
            <Button className='db_dot_table-btn' type='primary'>新建项目</Button>
            <AntTable columns={columns} dataSource={list} rowKey={record=>record.id}/>
            {
                modalShow && <AddProject closeModal={() => closeModal()} />
            }
        </div>
    }