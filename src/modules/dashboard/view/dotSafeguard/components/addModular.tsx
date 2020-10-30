import React, { useState } from 'react'
import { Modal, Form, Input, Checkbox } from 'antd'
export default (props) => {
    const { closeModal } = props
    const [form] = Form.useForm()
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    }
    const [list,setList] = useState([
        {
            lebel: '浙江',
            value: 1
        },
        {
            lebel: '浙江彩云',
            value: 2
        },
        {
            lebel: '移动办公云',
            value: 3
        },
    ])

    const submit=()=> {
        console.log(form)
    }
    return <div className='db_dot_project'>
        <Modal
            visible={true}
            title="添加模块"
            onOk={()=>submit()}
            onCancel={()=>closeModal()}
        >
            <Form form={form} {...layout}>
                <Form.Item label='模块名称' name='name' rules={[{ required: true, message: '请输入项目名称' }]}>
                    <Input placeholder='请输入' maxLength={20} />
                </Form.Item>
                <Form.Item label='项目编码' name='code'>
                    <Input placeholder='自动生成'/>
                </Form.Item>
                <Form.Item>
                    <div className='db_dot_project-checkbox' ><Checkbox>同步其他版本</Checkbox></div>
                </Form.Item>
                <Form.Item label='模块模板'>
                    <div className='db_dot_project-template'>
                        {
                            list.map((item,index)=> {
                                return <div className='db_dot_project-item' key={item.value}>{item.lebel}</div> 
                            } )
                        }
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}