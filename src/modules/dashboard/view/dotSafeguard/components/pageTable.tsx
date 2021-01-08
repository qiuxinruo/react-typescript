import React, { useState } from 'react'
import { Table as AntTable, Button, Modal, message } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import AddPage from './addPage'
import { RouteParams } from '@dashboard/router'
import { pageDel } from '@dashboard/service'
import PageDefault from '@dashboard/constant/table_page_default'

const { confirm } = Modal
export default (props) => {
    const { projectId, modularId } = useParams<RouteParams>()
    const history = useHistory()
    const dispatch =useDispatch()
    const { page, totalCount } = props
    const [modalShow, setShow] = useState(false)
    const [pageData,setPage] = useState({})
    const columns = [
        {
            title: '页面',
            dataIndex: 'pageName',
            key: 'pageName',
            render: (text, record) => {
                return <span className='db_dot_table-tableBtn' onClick={()=>goToPage(record)}>{text}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        // {
        //     title: '模块编码',
        //     dataIndex: 'moduleCode',
        //     key: 'moduleCode'
        // },
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
                    <span onClick={()=>goToPage(record)} className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>查看</span>
                    <span onClick={()=>{setShow(true);setPage(record)}} className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>编辑</span>
                    <span onClick={()=>delPage(record)} className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>删除</span>
                </div>
            }
        },
    ]
    const closeModal = (e) => {
        setShow(false)
        if(e){
            props.updataList()
        }
    }

    const goToPage=(record)=> {
        dispatch({
            type: 'SET_PAGE',
            payload: {
                name: record.pageName,
                id: record.id
            }
        })
        history.push(`/dashboard/page/${projectId}/${modularId}/${record.id}`)
    }


    const delPage=(record)=> {
        confirm({
            title: '确认删除',
            content: '是否确认删除，数据删除不可修复',
            okText: '确认',
            cancelText: '取消',
            onCancel() {},
            onOk() {
                pageDel({id:record.id}).then(res=> {
                    if(res.success){
                        message.success('删除成功')
                        props.updataList()
                    }else {
                        message.warning(res.msg)
                    }
                })
            }
        })
    }

    return <div className='db_dot_table'>
        <Button className='db_dot_table-btn' onClick={()=>{setShow(true);setPage({})}} type='primary'>新建页面</Button>
        <AntTable columns={columns} dataSource={props.list} rowKey={record => record.id} pagination={Object.assign({}, PageDefault, {
            onChange: (index, size) =>props.changePages(index, size),
            onShowSizeChange: (index, size) => props.changePages(index, size),
            current: page.pageIndex,
            total: totalCount,
            pageSize: page.pageSize,
            defaultPageSize: page.pageSize,
        })} />
        {
            modalShow && <AddPage closeModal={(e) => closeModal(e)} page={pageData} modularId={modularId}/>
        }
    </div>
}