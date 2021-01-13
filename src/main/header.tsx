import React, {useEffect, useState} from 'react'
import { Select, Menu } from 'antd'
import Cookies from 'js-cookie'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { State } from '@dashboard/store'
import { provList } from '@dashboard/service'
import { deepCopy } from '@/common/utils'

const { SubMenu } = Menu
const { Option } = Select
export default (props) => {
    const { workBookInfo } = useSelector((state: State) => state)
    console.log(props)
    console.log(workBookInfo,'workBookInfo')
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
                dispatch({
                    type:'SET_ENVS',
                    payload: res.data
                  })
                setEnv(Number(Cookies.get('env_choose')))
            }
        })
    },[])
    return (
        <div className='db_header'>
            {deepCopy(workBookInfo)&&deepCopy(workBookInfo).name?deepCopy(workBookInfo).name : 'SHINEMO BI'}
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