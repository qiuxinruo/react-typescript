import React, { useRef, useState, useEffect } from 'react'
import './index.less'

import { OPERATOR } from '@dashboard/constant'



export default (props) => {
    const dateRef = useRef()
    const { changeValue, value, changeRange, lastEditRange,isLegitimate,text } = props
    let el = document.getElementById('edit')

    const changeSymbol = (e) => {
        let edit = document.getElementById('edit')
        let selection = getSelection()
        edit.focus()
        let span = document.createElement('span')
        span.setAttribute('contentEditable', 'false')
        span.setAttribute('class', 'operator')
        span.textContent = `${e}`
        span.setAttribute('unselectable', 'on')
        if (lastEditRange) {
            // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
            selection.removeAllRanges()
            selection.addRange(lastEditRange)
        }
        if (selection.anchorNode.nodeName != '#text') {
            if (edit.childNodes.length > 0) {
                if (selection.anchorOffset === edit.childNodes.length) {
                    edit.appendChild(span)
                } else {
                    for (var i = 0; i < edit.childNodes.length; i++) {
                        if (i == selection.anchorOffset) {
                            edit.insertBefore(span, edit.childNodes[i])
                        }
                    }
                }

            } else {
                edit.appendChild(span)
            }
            let range = document.createRange()
            range.selectNode(span)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
        } else {
            let range = selection.getRangeAt(0)            
            range.insertNode(span)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
        }
        //记录光标对象
        changeRange(selection.getRangeAt(0))
        changeValue()
    }

    const getRange = () => {
        const selection = getSelection()
        // 设置最后光标对象
        const lastEditRange = selection.getRangeAt(0)
        changeRange(lastEditRange)
    }

    const changeEdit=(e)=> {
        const selection = getSelection()
        // 设置最后光标对象
        const lastEditRange = selection.getRangeAt(0)
        changeRange(lastEditRange)
        changeValue()
    }

    const onKeyDownKey=(e)=> {
        let key = e?e.keyCode:e.which
        if(key.toString() == "13"){
            e. preventDefault();
        }else{
            console.log(2)
        }
    }

    return <div className='db_detail_operator'>
        <div className='db_detail_operator-header'>
            {
                OPERATOR.map((item, index) => {
                    return <span key={index} onClick={e => changeSymbol(item.value)} className='db_detail_operator-item'>{item.label}</span>
                })
            }
        </div>
        <div className='db_detail_operator-editWrap' >
            <div id='edit' onInput={(e)=>changeEdit(e)} onKeyDown={(e)=>onKeyDownKey(e)} onKeyUp={() => getRange()} className='db_detail_operator-editContent' onClick={() => getRange()} contentEditable='true'>
            </div>
            <div className={isLegitimate?'db_detail_operator-des':'db_detail_operator-noDes'}>{text}</div>
        </div>
    </div>
}