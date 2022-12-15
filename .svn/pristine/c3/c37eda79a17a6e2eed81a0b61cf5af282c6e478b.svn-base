import Mock from 'mockjs2'
import { builder } from '@/mock/util'

const layout = [
    { x: 0, y: 0, w: 2, h: 5, i: '0' },
    { x: 2, y: 0, w: 2, h: 5, i: '1' },
    { x: 4, y: 0, w: 2, h: 5, i: '2' },
    { x: 6, y: 0, w: 2, h: 5, i: '3' },
    { x: 8, y: 0, w: 2, h: 5, i: '4' },
    { x: 10, y: 0, w: 2, h: 5, i: '5' }
]
const gridData = [{
    id: 1,
    productLine: '生产线1',
    productName: '生产线名称',
    productInstruction: '生产线描述',
    src: 'https://www.baidu.com',
    icon: 'fa-bell',
    iconColor: '#b37feb'
}, {
    id: 2,
    productLine: '生产线2',
    productName: '生产线名称',
    productInstruction: '生产线描述',
    src: 'https://juejin.cn',
    icon: 'fa-bell',
    iconColor: '#b37feb'
}, {
    id: 3,
    productLine: '生产线3',
    productName: '生产线名称',
    productInstruction: '生产线描述',
    src: 'https://www.iqiyi.com',
    icon: 'fa-bell',
    iconColor: '#b37feb'
}, {
    id: 4,
    productLine: '生产线4',
    productName: '生产线名称',
    productInstruction: '生产线描述',
    src: 'https://www.youku.com',
    icon: 'fa-bell',
    iconColor: '#b37feb'
}, {
    id: 5,
    productLine: '生产线5',
    productName: '生产线名称',
    productInstruction: '生产线描述',
    src: 'https://www.acfun.cn',
    icon: 'fa-bell',
    iconColor: '#b37feb'
}, {
    id: 6,
    productLine: '生产线6',
    productName: '生产线名称',
    productInstruction: '生产线描述',
    src: 'https://www.acfun.cn',
    icon: 'fa-bell',
    iconColor: '#b37feb'
}]
const templateGridData = (options) => {
    const data = { layout, gridData }
    return builder({
        data
    })
}
const dashboardData = [{
    'alias': '项目',
    'dashboardName': '百威',
    'permission': '可见可编可删',
    'remarks': 'cc',
    'id': 42,
    'updateUser': 'ink',
    'updateTime': '2022-05-24 21:15:31',
    'module': 'test'
}, {
    'dashboardName': 'zz',
    'permission': '可见可编可删',
    'remarks': 'cc',
    'id': 42,
    'updateUser': 'ink',
    'updateTime': '2022-05-24 21:15:31',
    'module': 'crm'
}]

const templateDashboardData = (options) => {
    const module = JSON.parse(options.body).module
    const rightData = dashboardData.filter(item => {
        return item.module === module
    })
    return builder({
        data: rightData,
        'pageNo': 1,
        'totalCount': 1,
        'option': null
    })
}
Mock.mock(/\/dashboard\/view\/mockInit/, 'post', templateGridData)
Mock.mock(/\/table\/dashboardData\/mockInit/, 'post', templateDashboardData)
