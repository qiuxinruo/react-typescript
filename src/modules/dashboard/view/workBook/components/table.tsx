import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getBaseUrl } from '@/common/utils'
import { Table as AntTable, Button, Modal, message, Tooltip } from 'antd'

import AddBook from './addBook'
import { deleteBook } from '@dashboard/service'

interface childProps {
    updateList: Function,
    data: any,

}
const TableRender: React.FC<childProps> = (props) => {
    const { updateList } = props
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
                        updateList()
                        message.success('删除成功')
                    } else {
                        message.warning(res.message)
                    }
                }).catch(err => console.log(err))
            }
        })
    }

    const closeModal = (e) => {
        setAddBook(false)
        if (e) {
            updateList()
        }
    }

    const handleRowClick=(e)=> {
        console.log(getBaseUrl())
        window.open(`${getBaseUrl()}dashboard/detail/${e.workBookId}/${e.dataSetId}`)
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
            title: '创建时间',
            key: 'create',
            dataIndex: 'create'
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
                        record.isEdit ? <span className='db_workbook_table-edit' onClick={(e) => editDashBord(record, e)}>
                            编辑
                    </span> : <Tooltip title={record.currentUserName + '正在编辑'}><span className='db_workbook_table-noEdit'>
                                编辑
                    </span></Tooltip>
                    }
                    {
                        record.isEdit ? <span onClick={(e) => delDashBord(record, e)} className='db_workbook_table-del'>删除
                    </span> : <Tooltip title={record.currentUserName + '正在编辑'}><span className='db_workbook_table-noDel'>
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
                onChange={e => { console.log(e) }}
                onRow={(record) => ({
                    onClick: ()=>handleRowClick(record),
                    style:{cursor:'pointer'} // 点击行
                })}
            />
            {
                showAddBook && <AddBook itemData={itemData} closeModal={(e) => closeModal(e)} />
            }
        </div>
    )
}

export default TableRender