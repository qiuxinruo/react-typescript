import React, { useState, useEffect } from 'react'
import { Divider, Button, Form, Input, Row, Col, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { companyInfo } from '@dashboard/constant'
import formatReg from '@/common/utils/formValidatorRegex'
import imgUrl from '../../statics/images/logo.png'
import { sendCaptcha,login,provList } from '@dashboard/service'
import Cookies from 'js-cookie'

import ChooseEnv from './ChooseEnv'

import './index.less'

const Login = (props) => {
  const [text, setText] = useState('获取验证码')
  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [liDoms, setLiDoms] = useState([])
  const [form] = Form.useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  let countdown = 60,setTimeouts = null

  useEffect(() => {
    return componentWillUnmount
  },[])

  function componentWillUnmount() {
    clearTimeout(setTimeouts)
  }
  /**
   * 发送验证码
   */
  const sendCaptchaHandle = () => {
    const mobile = form.getFieldValue('mobile')
    sendCaptcha({mobile:mobile}).then(res=> {
      if(res.success){
        setTime()
      }else {
        message.warning(res.msg)
      }
    })
  }

  /**
   *   倒计时
   */
  const setTime = () => {
    if (countdown <= 0) {
      setText('重新获取验证码')
      setDisable(false)
      countdown = 60
    } else {
      setDisable(true)
      if (countdown == 60) {
        setText('验证码已发送')
      } else {
        setText(`${countdown}S后重新获取`)
      }
      countdown--
      setTimeouts=setTimeout(() => {
        setTime()
      }, 1000)
    }
  }

  const onFinish = values => {
    const mobile = form.getFieldValue('mobile')
    const captcha = form.getFieldValue('captcha')
    login({
      mobile:mobile,
      captcha:captcha
    }).then(res=> {
      if(res.success){
        queryAllEnvs()
      }else{
        message.error(res.msg)
      }
    })
  }

  const queryAllEnvs= () => {
    provList({}).then(res=> {
      if(res.success){
        const { data } = res
        dispatch({
          type:'SET_ENVS',
          payload: data
        })
        const liDoms = data.map(item => (
          <li onClick={()=>handleSelectEnv(item.appType)} key={item.appType}>
            {item.name}
          </li>
        ))
        setVisible(true)
        setLiDoms(liDoms)
      }else {
        message.warning(res.msg)
      }
    })
  }

  const handleSelectEnv=(item)=> {
    Cookies.set('isLogined', '1')
    Cookies.set('env_choose', item)
    history.push('/dashboard/workbook')
  }

  return (
    <div className='db_login_index'>
      <header>
        <img src={imgUrl} alt="" />
        <span>{companyInfo.projectName}</span>
      </header>
      <div className='db_login_index-content'>
        <Form onFinish={(e) => onFinish(e)} form={form}>
          <Form.Item
            name='mobile'
            required
            rules={[({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value) {
                  setDisable(true)
                  return Promise.reject('请输入正确的手机号')
                }
                if (value && !formatReg.mobileReg.test(value)) {
                  setDisable(true)
                  return Promise.reject('请输入正确的手机号')
                } else {
                  setDisable(false)
                  return Promise.resolve()
                }
              }
            })]}

          >
            <Input placeholder="请输入手机号" maxLength={11} />
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={13}>
                <Form.Item required name='captcha' rules={[{required: true, message: '请输入手机验证码!'}]}>
                  <Input placeholder="请输入手机验证码"/>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Button block disabled={disable} onClick={() => sendCaptchaHandle()}>
                  {text}
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
              </Button>
          </Form.Item>
        </Form>
      </div>
      <footer>
        <div>
          <a
            href={companyInfo.shineMoOW}
            rel="noopener noreferrer"
            target="_blank"
          >
            讯盟官网
            </a>
          <Divider type="vertical" />
          <a
            href={companyInfo.cloudOW}
            rel="noopener noreferrer"
            target="_blank"
          >
            彩云官网
            </a>
          <Divider type="vertical" />
          <a
            href={companyInfo.client}
            rel="noopener noreferrer"
            target="_blank"
          >
            下载客户端
            </a>
        </div>
        <p>{companyInfo.footText}</p>
      </footer>
      <ChooseEnv visible={visible} liDoms={liDoms} />
    </div>
  )
}

export default Login