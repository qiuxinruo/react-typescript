import React, { useState, useEffect } from 'react'
import { Input, message, Modal } from 'antd'
import { ZoomInOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { calculatedField } from '@dashboard/service'
import Edit from './edit'
import { useSelector, useDispatch } from 'react-redux'
import { State } from '@dashboard/store'
import { deepCopy } from '@/common/utils'

export default (props) => {
    const { measures, dimensions, closeAdd, countItem } = props
    const { workBookInfo } = useSelector((state: State) => state)
    const [isShow, setShow] = useState(false)
    const [lastEditRange, setLastEditRange] = useState(null)
    const [isLegitimate, setLegitimate] = useState(true)
    const [name, setName] = useState('')
    const [list, setList] = useState([])

    useEffect(() => {
        getNumField()
    }, [measures, dimensions])

    useEffect(() => {
        if (countItem.name) {
            setName(countItem.name)
            let arr = countItem.expression.split('}')
            let newlist = []
            for (let i in arr) {
                let arr1 = arr[i].split('{')
                for (let i = 0; i < arr1.length; i++) {
                    newlist.push(arr1[i])
                }
            }
            let newDom = []
            const newList1 = newlist.filter(item => item !== '')
            for (let j = 0; j < newList1.length; j++) {
                let item = getDom(newList1[j])
                newDom.push(item)
            }
            let node = document.getElementById('edit')
            node.innerHTML = newDom.join('')

            var range = document.createRange();

            range.selectNodeContents(node);

            range.collapse(false);

            var sel = window.getSelection();

            sel.removeAllRanges();

            sel.addRange(range);
            setLastEditRange(sel.getRangeAt(0))
        }
    }, [])

    const getDom = (e) => {
        let newList = e.split('[').filter(item => item !== '')
        let newList1 = []
        for (let i = 0; i < newList.length; i++) {
            let item = newList[i].split(']').filter(item => item !== '')
            newList1.push(item.join())
        }
        if (newList1[0] == '1') {
            let measuresItem = measures.filter(item => item.field === newList1[2] && item.tableName === newList1[1] && item.fieldType === newList1[3] && item.function === newList1[4])[0]
            if (newList.length === 5 && measuresItem) {
                return `<span contenteditable='false' data-id='${measuresItem.field}' class='fileName' unselectable='on'>${measuresItem.name}</span>`
            }
        } else if (newList1[0] == '0') {
            console.log(2, newList1)
            let dimensionsItem = dimensions.filter(item => item.field === newList1[2] && item.tableName === newList1[1] && item.fieldType === newList1[3])[0]
            if (newList.length === 4 && dimensionsItem) {
                return `<span contenteditable='false' data-id='${dimensionsItem.field}' class='fileName' unselectable='on'>${dimensionsItem.alias}</span>`
            }
        } else {
            return e
        }
    }

    const getNumField = () => {
        let newList = []
        const newMeasures = measures.filter(item => item.fieldType === 'number')
        const newDimensions = dimensions.filter(item => item.fieldType === 'number')
        setList(newList.concat(newMeasures.concat(newDimensions)))
    }

    const changeRange = (e) => {
        setLastEditRange(e)
    }

    const getSubmitDataFormat = (field) => {
        const fieldItem = list.filter(item => item.field === field)[0]
        return `{[${fieldItem.function ? 1 : 0}][${fieldItem.tableName}][${fieldItem.field}][${fieldItem.fieldType}]${fieldItem.function ? `[${fieldItem.function}]}` : ''}`
    }

    const submit = () => {
        const newWorkBookInfo = deepCopy(workBookInfo)
        let node = document.getElementById('edit').cloneNode(true)
        let nodeList = node.childNodes
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className === 'fileName') {
                node.childNodes[i].innerHTML = getSubmitDataFormat(nodeList[i].getAttribute('data-id'))
            }
        }
        if (!isLegitimate) return
        if (!name) { message.warning('请填写指标名称'); return }

        calculatedField({
            name: name,
            expression: node.textContent,
            description: '',
            setId: newWorkBookInfo.dataSetId
        }).then(res => {
            message.success('创建成功')
            closeAdd()
        })
    }

    const getCheckDom = () => {
        let node = document.getElementById('edit').cloneNode(true)
        let nodeList = node.childNodes
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className === 'fileName') {
                node.childNodes[i].innerHTML = '0'
            }
        }
        try {
            eval(node.textContent)
            setLegitimate(true)
        }
        catch (err) {
            setLegitimate(false)

        }
    }

    const changeField = (e) => {
        let edit = document.getElementById('edit')
        let selection = getSelection()
        edit.focus()
        let span = document.createElement('span')
        span.setAttribute('contentEditable', 'false')
        span.setAttribute('class', 'fileName')
        span.setAttribute('data-id', `${e.field}`)
        span.textContent = `${e.name || e.alias}`
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
        setLastEditRange(selection.getRangeAt(0))
        getCheckDom()
    }
    return <div className='db_detail_calculation'>
        <Modal
            closable={false}
            visible={true}
            width={800}
            onOk={() => submit()}
            onCancel={() => closeAdd()}
            style={{ minWidth: '800px' }}
        >
            <div className='db_detail_calculation-wrap'>
                <div>指标名称<Input onChange={e => setName(e.target.value)} value={name} style={{ width: '300px', marginLeft: '20px' }} /></div>
                <div className='db_detail_calculation-content'>
                    <div className='db_detail_calculation-left'>
                        <Input placeholder="请输入" prefix={<ZoomInOutlined className='db_detail_calculation-searchIcon' />} />
                        <div>
                            {
                                !isShow ? <CaretDownOutlined className='db_detail_calculation-filedIcon' /> :
                                    <CaretUpOutlined className='db_detail_calculation-filedIcon' />
                            }数值字段（{list.length})
                        </div>
                        <div className='db_detail_calculation-contain'>
                            {
                                list.map((item, index) => {
                                    return <div onClick={() => changeField(item)} className='db_detail_calculation-item' key={index}>{item.name || item.alias}</div>
                                })
                            }
                        </div>
                    </div>
                    <div className='db_detail_calculation-right'>
                        <Edit changeValue={e => getCheckDom()} changeRange={e => changeRange(e)} lastEditRange={lastEditRange} isLegitimate={isLegitimate} />
                    </div>
                </div>
            </div>
        </Modal>
    </div>
}