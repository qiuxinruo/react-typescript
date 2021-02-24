import _ from 'lodash'

import request from './request'

let api = '/bi-gateway'


export function saveWorkbook(param:Object) {
  return request.post(`${api}/das/workbook/save`,{...param}).then(res=> res).catch(err=>err)
}

export function queryCubeList(param:Object) {
  return request.get(`${api}/das/dataSet/queryCubeList`,{...param}).then(result=> result).catch(err=>err)
}

