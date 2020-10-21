import immer from 'immer'
import _ from 'lodash'

import { uuid } from '@/common/utils'
import Request from './request'

import { Element, Dashboard } from '@dashboard/models'
import request from './request'

export function addElement(dashboard: Dashboard, type: Element['type']) {
  const id = uuid()
  const y = Object.keys(dashboard.elements).length
  const laylout = { i: id, x: 0, y, w: 8, h: 8, minW: 2, minH: 2 }
  const element = { id, type, name: '新的表格' }
  dashboard.elements[id] = element
  dashboard.layouts.push(laylout)
}

let api = '/bi-gateway'

export function deleteElement(dashboard: Dashboard, id: string) {
  delete dashboard.elements[id]
  dashboard.layouts = dashboard.layouts.filter(it => it.i !== id)
}

export function saveWorkbook(param:Object) {
  return request.post(`${api}/das/workbook/save`,{...param}).then(res=> res).catch(err=>err)
}

export function queryCubeList(param:Object) {
  return request.get(`${api}/das/dataSet/queryCubeList`,{...param}).then(result=> result).catch(err=>err)
}

export function queryList(param:Object) {
  return request.get(`${api}/das/workbook/queryList`,{...param}).then(result=> result).catch(err=>err)
}

export function deleteBook(param:Object) {
  return request.post(`${api}/das/workbook/delete`,{...param}).then(result=>result).catch(err=>err)
}

export function queryDimensionMeasure(param:Object) {
  return request.get(`${api}/das/dataSet/queryDimensionMeasure`,{...param}).then(result=> result).catch(err=>err)
}

export function queryReportList(param:Object) {
  return request.get(`${api}/das/report/queryList`,{...param}).then(result=> result).catch(err=>err)
}

//删除报表
export function deleteRepoet(param:Object) {
  return request.post(`${api}/das/report/delete`,{...param}).then(result=> result).catch(err=>err)
}

//筛选器中字段数据值查询
export function queryFieldValue(param:Object) {
  return request.get(`${api}/das/report/filter/queryFieldValue`,{...param}).then(result=>result).catch(err=>err)
}


//编辑报表
export function editReport(workbookId,dashboardId) {
  return request.get(`${api}/das/report/${workbookId}/${dashboardId}/edit`,{}).then(result=> result).catch(err=>err)
}

//保存报表
export function saveReport(param:Object) {
  return request.post(`${api}/das/report/save`,{...param}).then(result=> result).catch(err=>err)
}

//数据查询
export function getReportData(param:Object) {
  return request.post(`${api}/das/report/queryData`,{...param}).then(result=>result).catch(err=>err)
}
//数据导出
export function exportData(param:Object) {
  return request.post(`${api}/das/report/export`,{...param}).then(result=>result).catch(err=>err)
}

//获取验证码
export function sendCaptcha(param) {
  return request.get(`${api}/ms-mgr/sendCaptcha`,{...param}).then(result=> result).catch(err=>err)
}

//登录
export function login(param) {
  return request.get(`${api}/ms-mgr/login`,{...param}).then(result=> result).catch(err=>err)
}


