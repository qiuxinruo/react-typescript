import React from 'react'
import { Input } from 'antd'
const { Search } = Input

interface chilProps{
    handleSearch:Function,
    placeholderText?: string
}
const SearchRender:React.FC <chilProps>= (props) => {
    const { handleSearch,placeholderText } = props
    return (
        <div>
            <Search
                placeholder={placeholderText}
                enterButton="搜索"
                style={{ width: 300 }}
                onSearch={value => handleSearch(value)}
            />
        </div>
    )
}

export default SearchRender