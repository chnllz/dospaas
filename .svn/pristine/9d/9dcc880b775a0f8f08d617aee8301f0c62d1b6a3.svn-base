import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
const totalCount = 1021
const dataInit = (options) => {
  const parameters = getQueryParameters(options)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
  const name = parameters.name || '小明'
  const number = parameters.number || '13800138000'
  const remark = parameters.remark || '我的备注'
  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      'id': tmpKey,
      'name': name,
      'number': number,
      'operator': 'admin',
      'inputtime': '2020-05-09 18:54:12',
      'remark': remark + tmpKey + '-' + new Date().getTime()
    })
  }
  return builder({
    pageNo: pageNo,
    totalCount: totalCount,
    data: result
  })
}
const dataAdd = (options) => {
  return builder({
    name: '小王',
    number: new Date().getTime(),
    remark: '备注默认值'
  })
}
const dataDelete = (options) => {
  return builder('操作成功')
}
Mock.mock(/\/test\/User\/init/, 'get', dataInit)
Mock.mock(/\/test\/User\/add/, 'get', dataAdd)
Mock.mock(/\/test\/User\/delete/, 'post', dataDelete)
