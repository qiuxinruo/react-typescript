import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Checkbox, message, Select } from 'antd'
import { selecModuletList, selectList,selectPageList,codeGen,pageSave,pageEdit } from '@dashboard/service'

const { Option } = Select

export default (props) => {
    const { closeModal,page } = props
    const [data, setData] = useState({
        name: '',
        code: '',
        sync: false,
        moduleId: props.modularId,
        idList: []
    })
    const [projectList, setProject] = useState([])
    const [selectProject,setSelectProject] = useState([])
    const [moduleList, setModule] = useState([])
    const [selectModule, setSelectModule] = useState([])
    const [pageList, setPageList] = useState([])

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }

    useEffect(()=> {
        getProjectList()
        getCode()
    },[])

    const getCode = () => {
        codeGen({
            fkId:props.modularId,
            bizType: 2
        }).then(res => {
            console.log(res)
            if (res.success) {
                setData({
                    ...data,
                    code: res.data
                })
            }
        })
    }

    const getProjectList=()=> {
        selectList({}).then(res=> {
            if(res.success){
                setProject(res.data)
            }else {
                message.warning(res.msg)
            }
        })
    }

    const getModuleList=(e)=> {
        selecModuletList({
            projectIdList: e
        }).then(res => {
            if (res.success) {
                setModule(res.data)
            }
        })
    }

    const getPageList=(param)=> {
        selectPageList({
            moduleIdList: param
        }).then(res=> {
            if(res.success){
                setPageList(res.data)
            }else {
                message.error(res.msg)
            }
        })
    }

    const changeProject=(e)=> {
        setSelectProject([e])
        setSelectModule([])
        setData({
            ...data,
            idList:[]
        })
        getModuleList([e])
    }

    const changeModule=(e)=> {
        setSelectModule([e])
        setData({
            ...data,
            idList:[]
        })
        getPageList([e])
    }

    const changePage=(e)=> {
        setData({
            ...data,
            idList: [e]
        })
    }

    const submit = () => {
        console.log(data)
        if(!data.name){
            message.warning('请输入页面名称')
            return false
        }

        if(!data.code){
            message.warning('页面编码生成失败，重新生成')
            getCode()
            return false
        }

        if(props.page.id){
            pageEdit({
                id: props.page.id,
                name: data.name,
                code: data.code
            }).then(res=> {

            })
        }else {
            pageSave({...data}).then(res=> {
                if(res.success){
                    message.success('新建成功')
                    closeModal(true)
                }else {
                    message.error(res.msg)
                }
            })
        }
    }
    return <div className='db_dot_add'>
        <Modal
            visible={true}
            title={page.id?'修改页面':'添加页面'}
            onOk={() => submit()}
            onCancel={() => closeModal()}
        >
            <Form {...layout}>
                <Form.Item label='页面名称'>
                    <Input placeholder='请输入' maxLength={20} value={data.name} onChange={e => { setData({ ...data, name: e.target.value }) }} />
                </Form.Item>
                <Form.Item label='页面编码'>
                    <Input placeholder='自动生成' disabled value={data.code} />
                </Form.Item>
                {
                    !props.page.id && <Form.Item>
                        <div className='db_dot_add-checkbox' >
                            <Checkbox checked={data.sync} onChange={e => { setData({ ...data, sync: e.target.checked }) }}>同步其他版本</Checkbox>
                        </div>
                    </Form.Item>
                }
                {
                    data.sync && <Form.Item label='项目模板'>
                        <Select onChange={e=>changeProject(e)} placeholder='请选择' value={selectProject.length?selectProject[0]:undefined}>
                            {
                                projectList.map((item,index)=> {
                                return <Option key={index} value={item.id}>{item.projectName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
                {
                    data.sync && selectProject.length > 0 && <Form.Item label='模块模板'>
                        <Select onChange={e=> changeModule(e)} placeholder='请选择' value={selectModule.length?selectModule[0]:undefined}>
                            {
                                moduleList.map((item,index)=> {
                                return <Option value={item.id} key={index}>{item.moduleName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
                {
                    data.sync && selectModule.length > 0 && <Form.Item label='页面模板' >
                        <Select onChange={e=>changePage(e)} placeholder='请选择' value={data.idList.length?data.idList[0]:undefined}>
                            {
                                pageList.map((item,index)=> {
                                return <Option value={item.id} key={index}>{item.pageName}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                }
            </Form>
        </Modal>
    </div>
}