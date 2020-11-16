import React, { useState } from 'react'
import { Table as AntTable, Button, Modal, message } from 'antd'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import classnames from 'classnames'
import { RouteParams } from '@dashboard/router'
import AddModular from './addModular'
import { moduletDel } from '@dashboard/service'
import PageDefault from '@dashboard/constant/table_page_default'

const { confirm } = Modal

export default (props) => {
    const { projectId } = useParams<RouteParams>()
    const dispatch = useDispatch()
    const history = useHistory()
    const { page, totalCount } = props
    const [modalShow, setShow] = useState(false)
    const [module, setModule] = useState({})
    const columns = [
        {
            title: '模块',
            dataIndex: 'moduleName',
            key: 'moduleName',
            render: (text, record) => {
            return <span className='db_dot_table-tableBtn' onClick={()=>goToModular(record)}>{text}</span>
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '模块编码',
            dataIndex: 'moduleCode',
            key: 'moduleCode'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <span className={classnames('db_dot_table-tableBtn','db_dot_table-edit')} onClick={()=>goToModular(record)}>查看</span>
                    <span onClick={()=>{setShow(true);setModule(record)}} className={classnames('db_dot_table-tableBtn','db_dot_table-edit')}>编辑</span>
                    <span onClick={()=>delModular(record)} className={classnames('db_dot_table-tableBtn','db_dot_table-edit')}>删除</span>
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

    const goToModular=(record)=> {
        dispatch({
            type: 'SET_MODULAR',
            payload: {
                name: record.moduleName,
                id: record.id
            }
        })
        history.push(`/dashboard/modular/${projectId}/${record.id}`)
    }

    const delModular=(record)=> {
        confirm({
            title: '确认删除',
            content: '是否确认删除，数据删除不可修复',
            okText: '确认',
            cancelText: '取消',
            onCancel() {},
            onOk() {
                moduletDel({id:record.id}).then(res=> {
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
        <Button onClick={()=>{setShow(true);setModule({})}} type='primary' className='db_dot_table-btn'>新建模块</Button>
        <AntTable columns={columns} dataSource={props.list} rowKey={record => record.id} pagination={Object.assign({}, PageDefault, {
            onChange: (index, size) =>props.changePages(index, size),
            onShowSizeChange: (index, size) => props.changePages(index, size),
            current: page.pageIndex,
            total: totalCount,
            pageSize: page.pageSize,
            defaultPageSize: page.pageSize,
        })} />
        {
            modalShow && <AddModular closeModal={(e) => closeModal(e)} module={module} projectId={projectId}/>
        }
    </div>
}