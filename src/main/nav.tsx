import React , { useState }from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Menu } from 'antd'


interface childNav{
    defaultSelectedKeys: String[],
}

const Nav=(props) => {
    const pathNameArr = props.location.pathname.split('/');
    const defaultKey = pathNameArr.some(item=>item==='workbook')? ['/dashboard/workbook']: ['/dashboard/dotsafeguard']
    return (
        <div className='db_main_nav'>
            <div className='db_main_nav_content'>
                <Menu
                    defaultSelectedKeys={defaultKey}
                    className='db_main_nav_content_list'>
                    <Menu.Item key="/dashboard/workbook">
                        <Link to='/dashboard/workbook'>工作簿</Link>
                    </Menu.Item>
                    <Menu.Item key="/dashboard/dotsafeguard">
                        <Link to='/dashboard/dotsafeguard'>打点中心</Link>
                    </Menu.Item>                  
                </Menu>
            </div>
        </div>
    )
}

export default withRouter(Nav)