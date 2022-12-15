import Mock from 'mockjs2'
import { builder } from '@/mock/util'
// 坐席状态监控
const serverState = (options) => {
    // const parameters = getQueryParameters(options)
    const parameters = options
    const serverStateData = {
        agent_data: {
            pageNo: 1,
            totalCount: 100,
            data: []
        },
        call_data: {
            data: []
        }
    }
    const arr = ['签出', '空闲', '通话', '示忙', '振铃', '在线']
    const arrName = ['林磊', '小寒', '周尊华', '梁瑞轩', '李超玉', '花花']
    const arrTime = ['56分钟', '1小时30分钟', '2小时', '10分钟', '5分钟']
    for (let i = 0; i < 100; i++) {
        const status = arr[Math.floor((Math.random() * arr.length))]
        const realname = arrName[Math.floor((Math.random() * arrName.length))]
        const time = arrTime[Math.floor((Math.random() * arrTime.length))]
        serverStateData.agent_data.data.push({
            id: i + 1,
            user: realname,
            extension: i + 3,
            answerVolume: i + 1,
            totalAnswerTime: '11:00:32',
            callOutVolume: '3221',
            totalCallOutTime: '200',
            status: status,
            time: time,
            username: realname
        })
    }
    const arrZt = ['已处理', '未处理']
    const arrLdhm = ['13898888888', '13865888888', '17889569875', '13727651903', '13627651904']
    const arrLdsj = ['22/03/09 09:00:00', '22/03/09 10:02:00', '22/03/09 11:06:00', '22/03/09 12:04:00']
    const arrWait = ['10分钟', '2分钟', '30分钟', '5分钟']
    for (let i = 0; i < parseInt(parameters.rightTotal); i++) {
        const zt = arrZt[Math.floor((Math.random() * arrZt.length))]
        const ldhm = arrLdhm[Math.floor((Math.random() * arrLdhm.length))]
        const ldsj = arrLdsj[Math.floor((Math.random() * arrLdsj.length))]
        const waittime = arrWait[Math.floor((Math.random() * arrWait.length))]
        serverStateData.call_data.data.push({
            id: i + 1,
            ldhm: ldhm,
            ldsj: ldsj,
            waittime: waittime,
            zt: zt
        })
    }

    return builder({
        data: serverStateData
    })
}
// 话务宏观监控
const serverViewData = {
    avgWaitingTime: '00:00:12',
    ringingMissedCount: 560,
    answerCount: 680,
    avgBillingSeconds: '00:23:11',
    callInCount: 60,
    hangUpCount: 860,
    callOutAnswerRate: '32%',
    callOutAnswerCount: 32,
    callOutCount: '123',
    callOutUnAnswerCount: 221,
    dataOf12Hour: {
        hour: ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时'],
        hangUpCount: [0.8, 0.7, 0.6, 0.2, 0.4, 0.2, 0.6, 0.5, 0.4, 0.7, 0.6, 0.9],
        turnAgentCount: [0.6, 0.6, 0.9, 0.5, 0.6, 0.3, 0.2, 0.2, 0.1, 0.7, 0.5, 0.6],
        ringingMissedCount: [0.4, 0.5, 0.1, 0.2, 0.1, 0.8, 0.6, 0.5, 0.5, 0.4, 0.5, 0.3],
        connectCount: [0.2, 0.3, 0.8, 0.9, 0.6, 0.2, 0.5, 0.5, 0.6, 0.1, 0.5, 0.3],
        callInCount: [0.5, 0.4, 0.7, 0.3, 0.4, 0.5, 0.9, 0.5, 0.6, 0.4, 0.6, 0.1]
    },
    hangUpRate: '50%',
    connectRate: '40%',
    agentStatus: {
        login: 3,
        call: 0,
        ringing: 0,
        idle: 3,
        busy: 0,
        offline: 13
    },
    currentWaitCount: 3519,
    maximumWaitingTime: '00:00:12'
}
const serverView = (options) => {
    return builder({
        data: serverViewData
    })
}
// 今日客服活动
const ServiceActivities = (options) => {
    const arr = ['0', '3', '1', '2']
    const arrData = []
    for (let i = 0; i < 100; i++) {
        const status = arr[Math.floor((Math.random() * arr.length))]
        arrData.push({
            id: i,
            userName: 'gangshiming',
            nickName: '甘思名',
            status: status,
            statusDuration: '02:12:22',
            chating: '12',
            conversation: '12',
            chats: '12',
            averageConversationTime: 200,
            averageFirstAnswerTime: 50,
            averageAnswerTime: 300,
            commentSatisfiedPercent: '12',
            readyTime: '12:28:32'
        })
    }
    return builder({
        result: {
            data: arrData,
            page: 1,
            totalCount: arrData.length
        }
    })
}
// 在线宏观监控
const todayData = (options) => {
    const dataList = [{
        name: '南海诸岛',
        value: 5,
        eventTotal: 100,
        specialImportant: 10,
        import: 10,
        compare: 10,
        common: 40,
        specail: 20
    }, {
        name: '新疆',
        value: 88
    }]
    const firstMap = ['贵州', '广西', '广东', '香港', '甘肃', '广州', '福建']
    const secondMap = ['湖南', '江西', '湖北', '安徽']
    const thirdMap = ['云南', '四川', '陕西', '海南', '重庆', '河南', '山东', '江苏', '上海', '浙江', '台湾', '河北', '山西', '宁夏', '北京', '天津', '辽宁', '吉林', '黑龙江']
    const forthMap = ['西藏', '青海', '内蒙古']
    firstMap.forEach(item => {
        dataList.push({
            name: item,
            value: 1001
        })
    })
    secondMap.forEach(item => {
        dataList.push({
            name: item,
            value: 690
        })
    })
    thirdMap.forEach(item => {
        dataList.push({
            name: item,
            value: 488
        })
    })
    forthMap.forEach(item => {
        dataList.push({
            name: item,
            value: 5
        })
    })
    const efficienciesRanking = []
    const qualityRankings = []
    for (let i = 0; i < 8; i++) {
        efficienciesRanking.push({
            id: i,
            nickName: '001(张三)',
            conversationNumber: '999',
            messageCount: '3221',
            conversationTime: '12:22:22'
        })
        qualityRankings.push({
            id: i,
            nickName: '001(张三)',
            satisfyRate: '99.33%',
            conversationNumber: '999',
            evaluationNumber: '666',
            commentRate: '66.66%'
        })
    }
    return builder({
        data: {
            serviceStatus: [{
                status: 1,
                alias: 1,
                sum: 3
            }, {
                status: 0,
                alias: 0,
                sum: 6
            }, {
                status: 3,
                alias: 3,
                sum: 4
            }],
            conversationLocation: [{
                name: '广西',
                value: [108.320004, 22.82402]
            }, {
                name: '甘肃',
                value: [103.823557, 36.058039]
            }],
            conversations: [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 26, 27, 8, 0, 0, 1, 0, 0, 0],
            connecteNumbers: [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            unConnecteNumbers: [0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 6, 26, 27, 8, 0, 0, 1, 0, 0, 0],
            waitNumbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 0, 0, 0, 0, 6, 26, 27, 8, 0, 0, 1, 0, 0, 0],
            connectionRate: '10%',
            evaluationRate: '35%',
            satisfactionRate: '64%',
            areasFormatted: dataList,
            efficienciesRanking,
            qualityRankings,
            currentConversationNumber: '23',
            currentQueueNumber: '49',
            avgConversationTimeFormatted: {
                hours: '13',
                minutes: '13',
                seconds: '13'
            },
            conversationNumber: '37672',
            firstReplyAverageTimeFormatted: {
                minutes: '19',
                seconds: '13'
            },
            averageQueueTimeFormatted: {
                minutes: '19',
                seconds: '13'
            }
        }
    })
}
// 全国进线分布
const NationalIncomeLine = (options) => {
    const tableData = []
    const dataList = [{
        name: '南海诸岛',
        value: 5,
        eventTotal: 100,
        specialImportant: 10,
        import: 10,
        compare: 10,
        common: 40,
        specail: 20
    }, {
        name: '新疆',
        value: 88
    }]
    const firstMap = ['贵州', '广西', '广东', '香港', '甘肃', '广州', '福建']
    const secondMap = ['湖南', '江西', '湖北', '安徽']
    const thirdMap = ['云南', '四川', '陕西', '海南', '重庆', '河南', '山东', '江苏', '上海', '浙江', '台湾', '河北', '山西', '宁夏', '北京', '天津', '辽宁', '吉林', '黑龙江']
    const forthMap = ['西藏', '青海', '内蒙古']
    firstMap.forEach(item => {
        dataList.push({
            name: item,
            value: 1001
        })
    })
    secondMap.forEach(item => {
        dataList.push({
            name: item,
            value: 690
        })
    })
    thirdMap.forEach(item => {
        dataList.push({
            name: item,
            value: 488
        })
    })
    forthMap.forEach(item => {
        dataList.push({
            name: item,
            value: 5
        })
    })
    const arrProvince = ['贵州', '广西', '广东', '香港', '甘肃', '广州', '福建', '湖南', '江西', '湖北', '安徽', '云南', '四川', '陕西', '海南', '重庆', '河南', '山东', '江苏', '上海', '浙江', '台湾', '河北', '山西', '宁夏', '北京', '天津', '辽宁', '吉林', '黑龙江', '西藏', '青海', '内蒙古', '南海诸岛', '新疆']
    const arrJtl = ['260', '560', '860', '76', '651', '756']
    const arrJtl2 = ['25%', '65%', '30%', '10%', '69%', '95%']
    for (let i = 0; i < arrProvince.length; i++) {
        const jtl = arrJtl[Math.floor((Math.random() * arrJtl.length))]
        const jtl2 = arrJtl2[Math.floor((Math.random() * arrJtl2.length))]
        const sf = dataList.find(item => item.name === arrProvince[i])
        tableData.push({
            id: i,
            province: arrProvince[i],
            incomingLineCount: sf.value,
            connectCount: jtl,
            connectRate: jtl2
        })
    }
    return builder({
        data: {
            todayConnectionRate: '38%',
            provincialData: tableData,
            provincialIncoming: dataList,
            data: {
                dataList: dataList,
                data: tableData,
                count: arrProvince.length
            },
            historyIncomingLineCount: 37672,
            todayIncomingLineCount: 2864
        }
    })
}
export { serverView, NationalIncomeLine, serverState, ServiceActivities, todayData }
// 坐席状态监控初始化数据
Mock.mock(/\/monitor\/serverState\/mockInit/, 'post', serverState)
// 话务宏观监控初始化数据
Mock.mock(/\/monitor\/serverView\/mockInit/, 'post', serverView)
// 今日客服活动初始化数据
Mock.mock(/\/monitor\/ServiceActivities\/mockInit/, 'post', ServiceActivities)
// 在线宏观监控初始化数据
Mock.mock(/\/monitor\/todayData\/mockInit/, 'post', todayData)
// 全国进线分布初始化数据
Mock.mock(/\/monitor\/NationalIncomeLine\/mockInit/, 'post', NationalIncomeLine)
