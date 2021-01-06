import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default (props)=> {
    const [list, setList] = useState(props.bread)
    return <div className='db_dot_project-header'>
        {
            (props.bread || []).map((item,index)=> {
                if(props.bread.length-1===index){
                    return <span key={index}>{item.name}</span>
                }else {
                    return <span key={index}><Link to={item.url}>{item.name}</Link>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                }
            })
        }
    </div>
}