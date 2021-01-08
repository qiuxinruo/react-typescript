import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Checkbox, message, Select } from 'antd'
import { useSelector } from 'react-redux'
import { State } from '@dashboard/store'
import { selecModuletList, selectList, codeGen, moduleSave, moduleEdit, selectPageList } from '@dashboard/service'
import Cookies from 'js-cookie'
import { deepCopy } from '@/common/utils'
const { Option } = Select

export default (props) => {
    const { envs } = useSelector((state: State) => state)
    const [envsList,setEnvs] = useState(deepCopy(envs))
    const [prov,setProv] = useState(null)
    const { closeModal, module } = props
    const [data, setData] = useState({
        name: '',
        code: '',
        sync: false,
        projectId: props.projectId,
        idList: []
    })

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }
    const [list, setList] = useState([])
    const [projectList, setProjectList] = useState([])
    const [select, setSelect] = useState([])
    const submit = () => {
        if (!data.name) {
            message.warning('请输入模块名称')
            return false
        }
        if (!data.code) {
            message.warning('code生成失败')
            return false
        }
        if (props.module.id) {
            moduleEdit({
                id: props.module.id,
                name: data.name,
                code: data.code
            }).then(res => {
                if (res.success) {
                    message.success('修改成功')
                    closeModal(true)
                } else {
                    message.warning(res.msg)
                }
            })
        } else {
            moduleSave({
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
        getList()
        if (props.module.id) {
            setData({
                ...data,
                name: props.module.moduleName,
                code: props.module.moduleCode
            })
        }else {
            getCode()
        }
    }, [])

    const getCode = () => {
        codeGen({
            fkId: props.projectId,
            bizType: 1
        }).then(res => {
            if (res.success) {
                setData({
                    ...data,
                    code: res.data
                })
            }
        })
    }

    const getList = () => {
        selectList({
            prov: Cookies.get('env_choose')
        }).then(res => {
            if (res.success) {
                setProjectList(res.data)
            }
        })
    }

    const getModuleList = (e) => {
        selecModuletList({
            projectIdList: e
        }).then(res => {
            if (res.success) {
                setList(res.data)
            }
        })
    }

    const changeProjectItem = (e) => {
        setSelect([e])
        getModuleList([e])
        setData({
            ...data,
            idList: []
        })
    }

    const changeItem = (e) => {
        setData({
            ...data,
            idList: [e]
        })
    }

    const changeProv=(e)=> {
        setProv(e)
    }

    return <div className='db_dot_add'>
        <Modal
            visible={true}
            title={module.id ? '修改模块': '添加模块'}
            onOk={() => submit()}
            onCancel={() => closeModal()}
        >
            {console.log(data.name)}
            <Form {...layout}>
                <Form.Item label='模块名称'>
                    <Input placeholder='请输入' value={data.name} onChange={e => { setData({ ...data, name: e.target.value }) }} maxLength={20} />
                </Form.Item>
                <Form.Item label='模块编码'>
                    <Input placeholder='自动生成' value={data.code} disabled />
                </Form.Item>
                {
                    !props.module.id && <Form.Item>
                        <div className='db_dot_add-checkbox' >
                            <Checkbox onChange={e => { setData({ ...data, sync: e.target.checked }) }}>同步其他版本</Checkbox>
                        </div>
                    </Form.Item>
                }
                {/* {
                    data.sync && <Form.Item label='坏境'>
                        <Select onChange={e => changeProv(e)} placeholder='请选择' value={select.length ? select[0] : undefined}>
                            {
                                envsList.map((item, index) => {
                                    return <Option key={index} value={item.appType} > {item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                } */}
                {
                    data.sync &&prov&& <Form.Item label='项目模板'>
                        <Select onChange={e => changeProjectItem(e)} placeholder='请选择' value={select.length ? select[0] : undefined}>
                            {
                                projectList.map((item, index) => {
                                    return <Option key={index} value={item.id} > {item.projectName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
                {
                    select.length > 0 && data.sync&&prov && <Form.Item label='模块模板'>
                        <Select onChange={e => changeItem(e)} placeholder='请选择' value={data.idList.length ? data.idList[0] : undefined}>
                            {
                                list.map((item, index) => {
                                    return <Option key={index} value={item.id} >{item.moduleName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
            </Form>
        </Modal>
    </div >
}