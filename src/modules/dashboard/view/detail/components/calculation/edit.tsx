import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { OPERATOR } from '@dashboard/constant'

import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
import 'codemirror/theme/solarized.css'
import 'codemirror/mode/clike/clike.js'

export default ()=> {
    const changeCode=(editor,data,value)=> {
        console.log(value)
    }
    return <div className='db_detail_operator'>
        <div className='db_detail_operator-header'>
            {
                OPERATOR.map((item,index)=> {
                    return <span key={index} className='db_detail_operator-item'>{item.label}</span>
                })
            } 
        </div>
        <div>
            <CodeMirror 
                value='react-codemirror'
                options={{
                    lineNumbers: true,
                    mode: { name: 'text/javascript' },
                    　extraKeys: { "Ctrl": "autocomplete" },
                    fullScreen: true,
                    autoScroll: false
                }}
                onChange={(editor,data,value)=>changeCode(editor,data,value)}
            />
        </div>
    </div>
}