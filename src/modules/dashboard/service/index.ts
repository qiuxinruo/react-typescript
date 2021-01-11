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
let api1 = '/bi-gateway'

export function deleteElement(dashboard: Dashboard, id: string) {
  delete dashboard.elements[id]
  dashboard.layouts = dashboard.layouts.filter(it => it.i !== id)
}

export function saveWorkbook(param:Object) {
  return request.post(`${api1}/das/workbook/save`,{...param}).then(res=> res).catch(err=>err)
}

export function queryCubeList(param:Object) {
  return request.get(`${api1}/das/dataSet/queryCubeList`,{...param}).then(result=> result).catch(err=>err)
}

export function queryList(param:Object) {
  return request.get(`${api1}/das/workbook/queryList`,{...param}).then(result=> result).catch(err=>err)
}

export function deleteBook(param:Object) {
  return request.post(`${api1}/das/workbook/delete`,{...param}).then(result=>result).catch(err=>err)
}

export function queryDimensionMeasure(param:Object) {
  return request.get(`${api1}/das/dataSet/queryContent`,{...param}).then(result=> result).catch(err=>err)
}

export function queryReportList(param:Object) {
  return request.get(`${api1}/das/report/queryList`,{...param}).then(result=> result).catch(err=>err)
}

//删除报表
export function deleteRepoet(param:Object) {
  return request.post(`${api1}/das/report/delete`,{...param}).then(result=> result).catch(err=>err)
}

//筛选器中字段数据值查询
export function queryFieldValue(param:Object) {
  return request.get(`${api1}/das/report/filter/queryFieldValue`,{...param}).then(result=>result).catch(err=>err)
}


//编辑报表
export function editReport(workbookId,dashboardId) {
  return request.get(`${api1}/das/report/${workbookId}/${dashboardId}/edit`,{}).then(result=> result).catch(err=>err)
}

//保存报表
export function saveReport(param:Object) {
  return request.post(`${api1}/das/report/save`,{...param}).then(result=> result).catch(err=>err)
}

//数据查询
export function getReportData(param:Object) {
  return request.post(`${api1}/das/report/queryData`,{...param}).then(result=>result).catch(err=>err)
}
//数据导出
export function exportData(param:Object) {
  return request.post(`${api1}/das/report/export`,{...param}).then(result=>result).catch(err=>err)
}

//获取验证码
export function sendCaptcha(param) {
  return request.get(`${api}/ms-mgr/sendCaptcha`,{...param}).then(result=> result).catch(err=>err)
}

//登录
export function login(param) {
  return request.get(`${api}/ms-mgr/login`,{...param}).then(result=> result).catch(err=>err)
}

export function configurationCenter(param) {
  return request.get(`${api}/ms-mgr/property/listEnv`,{...param}).then(result=> result).catch(err=>err)
}


//释放工作簿锁
export function alive(param) {
  return request.post(`${api1}/das/workbook/alive`,{...param}).then(result=> result).catch(err=>err)
}

//项目列表
export function projectList(param) {
  return request.post(`${api}/dotMgr/dot/project/list`,{...param}).then(result => result).catch(err=>err)
}

//省市编码接口
export function provList(param) {
  return request.get(`${api}/dotMgr/dot/prov/list`,{...param}).then(result=> result).catch(err=>err)
}

//编码生成接口
export function codeGen(param) {
  return request.get(`${api}/dotMgr/dot/code/gen`,{...param}).then(result=> result).catch(err=>err)
}

//创建项目
export function projectSave(param) {
  return request.post(`${api}/dotMgr/dot/project/save`,{...param}).then(result=> result).catch(err=>err)
}

//编辑项目
export function projectEdit(param) {
  return request.post(`${api}/dotMgr/dot/project/edit`,{...param}).then(result=> result).catch(err=>err)
}

//删除项目
export function projectDel(param) {
  return request.get(`${api}/dotMgr/dot/project/delete`,{...param}).then(result=> result).catch(err=>err)
}

//项目下拉
export function selectList(param) {
  return request.post(`${api}/dotMgr/dot/project/selectList`,{...param}).then(result=> result).catch(err=>err)
}

//创建模块
export function moduleSave(param) {
  return request.post(`${api}/dotMgr/dot/module/save`,{...param}).then(result=> result).catch(err=>err)
}

//编辑模块
export function moduleEdit(param) {
  return request.post(`${api}/dotMgr/dot/module/edit`,{...param}).then(result=> result).catch(err=>err)
}

//删除项目
export function moduletDel(param) {
  return request.get(`${api}/dotMgr/dot/module/delete`,{...param}).then(result=> result).catch(err=>err)
}

//模块分页列表
export function moduleList(param) {
  return request.post(`${api}/dotMgr/dot/module/list`,{...param}).then(result=> result).catch(err=>err)
}

//模块下拉
export function selecModuletList(param) {
  return request.post(`${api}/dotMgr/dot/module/selectList`,{...param}).then(result=> result).catch(err=>err)
}

//创建页面
export function pageSave(param) {
  return request.post(`${api}/dotMgr/dot/page/save`,{...param}).then(result=> result).catch(err=>err)
}

//编辑页面
export function pageEdit(param) {
  return request.post(`${api}/dotMgr/dot/page/edit`,{...param}).then(result=> result).catch(err=>err)
}

//删除页面
export function pageDel(param) {
  return request.get(`${api}/dotMgr/dot/page/delete`,{...param}).then(result=> result).catch(err=>err)
}

//页面分页列表
export function pageList(param) {
  return request.post(`${api}/dotMgr/dot/page/list`,{...param}).then(result=> result).catch(err=>err)
}

//页面下拉
export function selectPageList(param) {
  return request.post(`${api}/dotMgr/dot/page/selectList`,{...param}).then(result=> result).catch(err=>err)
}

//创建事件
export function eventSave(param) {
  return request.post(`${api}/dotMgr/dot/event/save`,{...param}).then(result=> result).catch(err=>err)
}

//编辑事件
export function eventEdit(param) {
  return request.post(`${api}/dotMgr/dot/event/edit`,{...param}).then(result=> result).catch(err=>err)
}

//删除事件
export function eventDel(param) {
  return request.get(`${api}/dotMgr/dot/event/delete`,{...param}).then(result=> result).catch(err=>err)
}

//编辑事件
export function eventList(param) {
  return request.post(`${api}/dotMgr/dot/event/list`,{...param}).then(result=> result).catch(err=>err)
}

//事件下拉
export function eventSelectList(param) {
  return request.post(`${api}/dotMgr/dot/event/selectList`,{...param}).then(result=> result).catch(err=>err)
}

export function selectTypeList(param) {
  return request.get(`${api}/dotMgr/dot/event/type/selectList`,{...param}).then(result=> result).catch(err=>err)
}

export function operatorList(param) { //筛选操作符
  return request.get(`${api1}/das/report/filter/operatorList`,{...param}).then(result=> result).catch(err=>err)
}

export function calculatedField(param) { //计算字段保存
  return request.post(`${api1}/das/dataSet/calculate/save`,{...param}).then(result=> result).catch(err=>err)
}

export function deleteCalculate(param) {
  return request.post(`${api1}/das/dataSet/calculate/delete`,{...param}).then(result=> result).catch(err=>err)
}
