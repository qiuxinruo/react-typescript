import React from 'react'
import { Select, Menu } from 'antd'
import Cookies from 'js-cookie'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const { SubMenu } = Menu

export default () => {
    const history = useHistory()
    const logout = e => {
        if(e.key === 'logout'){
            Cookies.remove('isLogined')
            Cookies.remove('bi_sid')
            Cookies.remove('bi_uid')
            history.push('/dashboard/login')
        }
      }
    return (
        <div className='db_header'>
            SHINEMO BI
            <div className='db_header_info'>
                <Select
                    style={{
                        width: 120,
                    }}
                    placeholder='选择坏境'
                >
                </Select>
                <div className='db_header_info-menuWrap'>
                    <Menu mode="horizontal" className='db_header_info-menu' onClick={(e)=>logout(e)}>
                        <SubMenu
                            title={
                                <span>
                                    <UserOutlined />
                                    {Cookies.get('bi_name')}
                                </span>
                            }
                        >
                            <Menu.Item key="logout">退出登陆</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        </div>
    )
}