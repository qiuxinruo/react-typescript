import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Checkbox, message, Select } from 'antd'
import { selectList, projectSave, projectEdit } from '@dashboard/service'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import  Cookies from 'js-cookie'
import { deepCopy } from '@/common/utils'
const { Option } = Select

export default (props) => {
    const { closeModal, project } = props
    const { envs } = useSelector((state: State) => state)
    const [envsList,setEnvs] = useState(deepCopy(envs))
    const [data, setData] = useState({
        name: '',
        sync: false,
        prov: null,
        idList: []
    })
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }
    const [list, setList] = useState([])

    const submit = () => {
        if (!data.name) {
            message.warning('请填写项目名称')
            return false
        }
        if (props.project.id) {
            projectEdit({
                name: data.name,
                id: props.project.id
            }).then(res => {
                if (res.success) {
                    message.success('修改成功')
                    closeModal(true)
                } else {
                    message.warning(res.msg)
                }
            })
        } else {
            projectSave({
                ...data
            }).then(res => {
                if (res.success) {
                    message.success('新建成功')
                    closeModal(true)
                } else {
                    message.warning(res.msg)
                }
            })
        }
    }

    useEffect(() => {
       console.log(props)
        if (props.project.id) {
            setData({
                ...data,
                name: props.project.projectName
            })
            getSelectProject(props.project.prov)
        }
    }, [])

    const changeEnv=(e)=> {
        setData({
            ...data,
            prov:e,
            idList:[]
        })
        console.log(e)
        getSelectProject(e)
    }

    const getSelectProject = (e) => {
        selectList({ prov: e}).then(res => {
            if (res.success) {
                setList(res.data)
            }
        })
    }

    const changeItem = (e) => {
        setData({
            ...data,
            idList: [e]
        })
    }
    return <div className='db_dot_add'>
        <Modal
            visible={true}
            title={project.id?'修改项目':'添加项目'}
            onOk={() => submit()}
            onCancel={() => closeModal()}
        >
            <Form form={form} {...layout}>
                <Form.Item label='项目名称'>
                    <Input placeholder='请输入' maxLength={20} value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                </Form.Item>
                {
                    !props.project.id && <Form.Item>
                        <div className='db_dot_add-checkbox' >
                            <Checkbox onChange={e => setData({ ...data, sync: e.target.checked })} checked={data.sync}>同步其他版本</Checkbox>
                        </div>
                    </Form.Item>
                }
                {
                    data.sync && <Form.Item label='坏境'>
                        <Select onChange={(e) => changeEnv(e)} placeholder='请选择' value={data.prov}>
                            {
                                envsList.map((item, index) => {
                                    return <Option key={index} value={item.appType}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
                {
                    data.sync && data.prov && <Form.Item label='项目模板'>
                        <Select onChange={(e) => changeItem(e)} placeholder='请选择' value={data.idList.length ? data.idList[0] : undefined}>
                            {
                                list.map((item, index) => {
                                    return <Option key={index} value={item.id}>{item.projectName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
            </Form>
        </Modal>
    </div>
}