import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Table as AntTable, Button, Modal, message, Tooltip } from 'antd'

import AddBook from './addBook'
import { deleteBook } from '@dashboard/service'

interface childProps {
    updataList: Function,
    data: any
}
const TableRender: React.FC<childProps> = (props) => {
    const { updataList } = props
    const [showAddBook, setAddBook] = useState(false)
    const [itemData, setItemData] = useState({})

    const editDashBord = (record, e) => {
        e.stopPropagation()
        setItemData(record)
        setAddBook(true)
    }

    const delDashBord = (record, e) => {
        e.stopPropagation()
        Modal.confirm({
            title: '是否删除',
            content: '确认删除后，数据不可修复',
            onOk: () => {
                deleteBook({ workBookId: record.workBookId }).then(res => {
                    if (res.success) {
                        updataList()
                        message.success('删除成功')
                    } else {
                        message.warning(res.message)
                    }
                }).catch(err => console.log(err))
            }
        })
    }

    const closeModal = () => {
        setAddBook(false)
    }

    const columns = [
        {
            title: '工作簿名称',
            key: 'name',
            dataIndex: 'name',
            render: (text, render) => {
                return <span>{text}</span>
            }
        },
        {
            title: '数据集',
            key: 'dataSetCubeName',
            dataIndex: 'dataSetCubeName'
        },
        {
            title: '发布人',
            key: 'ownerName',
            dataIndex: 'ownerName'
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: 200,
            render: (text, record) => {
                return <span>
                    {
                        record.isEdit ? <span className='db_workbook_table-edit' onClick={(e) => editDashBord(record,e)}>
                        编辑
                    </span>: <Tooltip title={record.currentUserName+'正在编辑'}><span className='db_workbook_table-noEdit'>
                        编辑
                    </span></Tooltip>
                    }
                    {
                        record.isEdit ? <span onClick={(e) => delDashBord(record, e)} className='db_workbook_table-del'>删除
                    </span> : <Tooltip title={record.currentUserName+'正在编辑'}><span className='db_workbook_table-noDel'>
                        删除
                    </span></Tooltip>
                    }
                </span>
            }
        }
    ]

    return (
        <div>
            <Button onClick={() => { setAddBook(true); setItemData({}) }} className='db_workbook_table-btn' type='primary'>新建工作簿</Button>
            <AntTable
                columns={columns}
                dataSource={props.data}
                rowKey={record => record.workBookId}
            />
            {
                showAddBook && <AddBook itemData={itemData} closeModal={() => closeModal()} />
            }
        </div>
    )
}

export default TableRender