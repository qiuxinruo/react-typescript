import React, { useState } from 'react'
import { Table as AntTable, Button, Modal, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { projectDel } from '@dashboard/service'
import AddProject from './addProject'

import PageDefault from '@dashboard/constant/table_page_default'

const { confirm } = Modal

export default (props) => {
    const { page,totalCount } = props
    const [modalShow, setShow] = useState(false)
    const [project, setProject] = useState({})
    const history = useHistory()
    const dispatch = useDispatch()

    const goToProject = (record) => {
        dispatch({
            type: 'SET_PROJECT',
            payload: {
                name: record.projectName,
                id: record.id
            }
        })
        history.push(`/dashboard/project/${record.id}`)
    }

    const columns = [
        {
            title: '项目名称',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record) => {
                return <span onClick={() => goToProject(record)} className='db_dot_table-tableBtn'>{text}</span>
            }
        },
        {
            title: '发布人',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <span
                        onClick={() => goToProject(record)}
                        className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}
                    >
                        查看
                    </span>
                    <span
                        className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}
                        onClick={() => { setShow(true); setProject(record) }}
                    >
                        编辑
                    </span>
                    <span
                        onClick={() => delProject(record)}
                        className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}
                    >
                        删除
                    </span>
                </div>
            }
        },
    ]
    const closeModal = (e) => {
        setShow(false)
        if (e) {
            props.updataList()
        }
    }     

    const delProject = (record) => {
        confirm({
            title: '确认删除',
            content: '是否确认删除，数据删除不可修复',
            okText: '确认',
            cancelText: '取消',
            onCancel() { },
            onOk() {
                projectDel({ id: record.id }).then(res => {
                    if (res.success) {
                        message.success('删除成功')
                        props.updataList()
                    } else {
                        message.error(res.msg)
                    }
                })
            }
        })
    }

    return <div className='db_dot_table'>
        <Button className='db_dot_table-btn' onClick={() => { setShow(true); setProject({}) }} type='primary'>新建项目</Button>
        <AntTable columns={columns} dataSource={props.list} rowKey={record => record.id} pagination={Object.assign({}, PageDefault, {
            onChange: (index, size) =>props.changePages(index, size),
            onShowSizeChange: (index, size) => props.changePages(index, size),
            current: page.pageIndex,
            total: totalCount,
            pageSize: page.pageSize,
            defaultPageSize: page.pageSize,
        })} />
        {
            modalShow && <AddProject closeModal={(e) => closeModal(e)} project={project} />
        }
    </div>
}