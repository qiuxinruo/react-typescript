import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from '@dashboard/components/loading'
import { getBaseUrl } from '@/common/utils'
const { Option } = Select

import { queryCubeList, saveWorkbook } from '@dashboard/service'

interface chilProps {
    closeModal: Function,
    itemData: any,
    id: Number,
    workBookId: Number
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
    },
}

const AddBook = (props) => {
    const { closeModal, itemData } = props
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [data, setData] = useState({
        name: '',
        dataSetCubeName: ''
    })
    const dispatch = useDispatch()
    useEffect(() => {
        getList()
        if (itemData) {
            setData({
                name: itemData.name,
                dataSetCubeName: itemData.dataSetCubeName,
            })
        } else {
            setData({
                name: '',
                dataSetCubeName: ''
            })
        }
    }, [])

    const getList = () => {
        setLoading(true)
        queryCubeList({}).then(res => {
            setLoading(false)
            if (res.success) {
                setList(res.data)
            }else{
                message.error(res.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const changeName = (e) => {
        setData({
            ...data,
            name: e
        })
    }

    const changeDataSet = e => {
        setData({
            ...data,
            dataSetCubeName: e
        })
    }

    const submit = () => {
        if (!data.name) {
            message.warning('请填写工作簿名称')
            return false
        }
        if (!data.dataSetCubeName) {
            message.warning('请选择数据集')
            return false
        }
        let param = itemData ? { id: itemData.workBookId, ...data } : { ...data };
        setLoading(true)
        saveWorkbook(param).then(res => {
            setLoading(false)
            if (res.success) {
                closeModal(true)
                if(itemData.workBookId){
                    message.success('修改成功')
                }else {
                    const workBookId = res.data.workBookId
                    const dataSetId = res.data.dataSetId
                    window.open(`${getBaseUrl()}dashboard/detail/${workBookId}/${dataSetId}`)
                }
            }else{
                message.error(res.message)
            }
        })
    }

    return (
        <Modal
            visible={true}
            title= {itemData.name ? '编辑工作簿' : '新建工作簿'}
            okText={itemData.workBookId?'完成':'下一步'}
            onCancel={() => closeModal()}
            onOk={() => submit()}
        >
            <div>
                <Form {...formItemLayout}>
                    <Form.Item label='工作簿名称' required>
                        <Input value={data.name} onChange={e => changeName(e.target.value)} placeholder='请输入' maxLength={20} />
                    </Form.Item>
                    <Form.Item label='选择数据集' required>
                        <Select disabled={itemData.workBookId} value={data.dataSetCubeName} placeholder='请选择' onChange={e => changeDataSet(e)}>
                            {
                                list.map((item, index) => {
                                    return <Option key={index} value={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            {
                loading && <Loading />
            }
        </Modal>
    )
}

export default withRouter(AddBook)