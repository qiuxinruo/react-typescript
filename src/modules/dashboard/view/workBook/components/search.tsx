import React from 'react'
import { Input } from 'antd'
const { Search } = Input

interface chilProps{
    handleSearch:Function
}
const SearchRender:React.FC <chilProps>= (props) => {
    const { handleSearch } = props
    return (
        <div>
            <Search
                placeholder="请输入工作簿名称"
                enterButton="搜索"
                style={{ width: 300 }}
                onSearch={value => handleSearch(value)}
            />
        </div>
    )
}

export default SearchRender