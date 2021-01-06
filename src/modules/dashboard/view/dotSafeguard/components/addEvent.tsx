import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Checkbox, message, Select } from 'antd'
import { eventEdit, eventSave, codeGen, selectTypeList } from '@dashboard/service'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
const { Option } = Select

export default (props) => {
    const { } = useSelector((state: State) => state)
    const { closeModal,typeList,event } = props
    const [data, setData] = useState({
        eventDesc: '',
        eventCode: '',
        eventType: undefined,
        pageId: props.pageId
    })
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }


    const submit = () => {
        if (!data.eventDesc) {
            message.warning('请填写项目名称')
            return false
        }
        if (!data.eventType) {
            message.warning('请选择打点事件类型')
            return false
        }
        if (props.event.id) {
            eventEdit({
                id: event.id,
                eventDesc: data.eventDesc,
                eventCode: data.eventCode,
                eventType: data.eventType
            }).then(res => {
                if (res.success) {
                    message.success('修改成功')
                    closeModal(true)
                } else {
                    message.warning(res.msg)
                }
            })
        } else {
            eventSave({ ...data }).then(res => {
                if (res.success) {
                    message.success('新建成功')
                    closeModal(true)
                } else {
                    message.warning(res.msg)
                }
            })
        }
    }

    const getCode = () => {
        codeGen({
            fkId: props.pageId,
            bizType: 3
        }).then(res => {
            if (res.success) {
                if(props.event.id){
                    setData({
                        ...data,
                        eventDesc: props.event.eventDesc,
                        eventCode: res.data,
                        eventType: Number(props.event.eventType),
                    })
                }else {
                    setData({
                        ...data,
                        eventCode: res.data
                    })
                }
            }
        })
    }

    useEffect(() => {
        getCode()
    }, [])

    return <div className='db_dot_add'>
        <Modal
            visible={true}
            title={props.event.id?'修改打点事件':'新建打点事件'}
            onOk={() => submit()}
            onCancel={() => closeModal()}
        >
            <Form {...layout}>
                <Form.Item label='事件描述'>
                    <Input placeholder='请输入' maxLength={20} value={data.eventDesc} onChange={e => setData({ ...data, eventDesc: e.target.value })} />
                </Form.Item>
                <Form.Item label='事件编码'>
                    <Input placeholder='自动生成' maxLength={20} value={data.eventCode} disabled />
                </Form.Item>
                <Form.Item label='事件类型'>
                    <Select onChange={e =>{setData({...data,eventType: e })}} placeholder='请选择' value={data.eventType}>
                        {
                            typeList.map((item, index) => {
                                return <Option key={index} value={item.type} > {item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    </div>
}