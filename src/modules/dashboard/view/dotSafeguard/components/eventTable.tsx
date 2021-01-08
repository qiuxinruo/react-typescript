import React, { useState, useEffect } from 'react'
import { Table as AntTable, Button, message , Modal} from 'antd'
import { Link, useParams } from 'react-router-dom'
import { RouteParams } from '@dashboard/router'
import classnames from 'classnames'
import AddEvent from './addEvent'
import PageDefault from '@dashboard/constant/table_page_default'
import { selectTypeList, eventDel } from '@dashboard/service'

const { confirm } = Modal

export default (props) => {
    const { projectId, modularId, pageId } = useParams<RouteParams>()
    const [isShow, setShow] = useState(false)
    const { totalCount, param } = props
    const [event, setEvent] = useState({})
    const [typeList, setTypeList] = useState([])
    const columns = [
        {
            title: '打点事件',
            dataIndex: 'eventDesc',
            key: 'eventDesc',
            render: (text, record) => {
                return <span>{text}</span>
            }
        },
        {
            title: '事件类型',
            dataIndex: 'eventType',
            key: 'eventType',
            render: (text) => {
                const arr = typeList.filter(item => item.type == text)
                return <span>{arr.length?arr[0].name: '-'}</span>
            }
        },
        {
            title: '事件编码',
            dataIndex: 'eventCode',
            key: 'eventCode'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <span onClick={()=> { setShow(true); setEvent(record) }} className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>编辑</span>
                    <span onClick={()=>handleEventDel(record)} className={classnames('db_dot_table-tableBtn', 'db_dot_table-edit')}>删除</span>
                </div>
            }
        },
    ]

    useEffect(() => {
        getTypeList()
    }, [])

    const closeModal = (e) => {
        setShow(false)
        if (e) {
            props.updataList()
        }
    }

    const handleEventDel=(record)=> {
        confirm({
            title: '确认删除',
            content: '是否确认删除，数据删除不可修复',
            okText: '确认',
            cancelText: '取消',
            onCancel() {},
            onOk() {
                eventDel({id:record.id}).then(res=> {
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

    const getTypeList = () => {
        selectTypeList({}).then(res => {
            if (res.success) {
                setTypeList(res.data)
            } else {
                message.error(res.msg)
            }

        })
    }

    return <div>
        <Button className='db_dot_table-btn' type='primary' onClick={() => { setShow(true); setEvent({}) }}>新建打点事件</Button>
        <AntTable columns={columns} dataSource={props.list} pagination={Object.assign({}, PageDefault, {
            onChange: (index, size) => props.changePages(index, size),
            onShowSizeChange: (index, size) => props.changePages(index, size),
            current: param.pageIndex,
            total: totalCount,
            pageSize: param.pageSize,
            defaultPageSize: param.pageSize,
        })} />
        {
            isShow && <AddEvent closeModal={e => closeModal(e)} event={event} pageId={pageId} typeList={typeList} />
        }
    </div>
}