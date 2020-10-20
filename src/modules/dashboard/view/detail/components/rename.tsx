import React, { useState } from 'react'
import { Modal,Input } from 'antd'
export default (props)=> {
    const { closeModal } = props
    const [name,setName] = useState(props.name)
    return <Modal
        visible={true}
        title='重命名'
        onOk={()=>closeModal(name)}
        onCancel={()=>closeModal(false)}
    >
        <Input value={name} onChange={e=>setName(e.target.value)} placeholder='请输入'/>
    </Modal>
}