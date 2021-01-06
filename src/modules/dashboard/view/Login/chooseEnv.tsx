import React from 'react'
import { Modal} from 'antd'

const ChooseEnv = (props) => {
     return <Modal
      visible={props.visible}
      title="选择环境"
      maskClosable={false}
      closable={false}
      className='db_login_index-cmodal'
      footer={null}
    >
      <ul className='db_login_index-envList'>{props.liDoms}</ul>
    </Modal>
}
  
  export default ChooseEnv