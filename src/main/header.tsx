import React, {useEffect, useState} from 'react'
import { Select, Menu } from 'antd'
import Cookies from 'js-cookie'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '@dashboard/store'
import { provList } from '@dashboard/service'

const { SubMenu } = Menu
const { Option } = Select
export default () => {
    const [list,setList] = useState([])
    const [env,setEnv] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const logout = e => {
        if(e.key === 'logout'){
            Cookies.remove('isLogined')
            Cookies.remove('bi_sid')
            Cookies.remove('bi_uid')
            history.push('/dashboard/login')
        }
      }
    const changeEnv=(e)=> {
        setEnv(e)
        Cookies.set('env_choose', e)
        history.push('/dashboard/workbook')
        window.location.reload()
    }
    useEffect(()=> {
        provList({}).then(res=> {
            if(res.success){
                setList(res.data)
                setEnv(Number(Cookies.get('env_choose')))
            }
        })
    },[])
    return (
        <div className='db_header'>
            SHINEMO BI
            <div className='db_header_info'>
                <Select
                    style={{
                        width: 120,
                    }}
                    placeholder='选择坏境'
                    onChange={e=>changeEnv(e)}
                    value={env}
                >
                    {
                        list.map((item,index)=> {
                        return <Option key={index} value={item.appType}>{item.name}</Option>
                        })
                    }
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