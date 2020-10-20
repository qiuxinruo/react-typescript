import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'


interface childNav{
    defaultSelectedKeys: String[],
}

const Nav=() => {
    const defaultSelectedKeys = ['/dashboard/workbook']
    return (
        <div className='db_main_nav'>
            <div className='db_main_nav_content'>
                <Menu
                    defaultSelectedKeys={defaultSelectedKeys}
                    className='db_main_nav_content_list'>
                    <Menu.Item key="/dashboard/workbook">
                        <Link to='/dashboard/workbook'>工作簿</Link>
                    </Menu.Item>                    
                </Menu>
            </div>
        </div>
    )
}

export default Nav