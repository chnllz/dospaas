import Mock from 'mockjs2'
import { builder, getBody } from '@/mock/util'
// 问卷模块
let Questionnaireresult = [{
    id: 1,
    nairename: '问卷' + 1,
    topicsNumber: 1,
    distribution_mode: '0',
    inputTime: '2021-11-15 09:21:56',
    inputUser: '张哥',
    lastModify: '测试用户',
    lastModifiedTime: '2021-11-15 09:30:56'
}, {
    id: 2,
    nairename: '问卷' + 2,
    topicsNumber: 22,
    distribution_mode: '0',
    inputTime: '2021-11-15 09:21:56',
    inputUser: '王哥',
    lastModify: '测试用户2',
    lastModifiedTime: '2021-11-15 09:30:56'
}]
const questionnaireInit = (options) => {
    const parameters = getBody(options)
    const pageNo = parseInt(parameters.pageNo)
    if (!parameters.nairename) {
        return builder({
            pageNo: pageNo,
            totalCount: Questionnaireresult.length,
            data: Questionnaireresult
        })
    } else {
        const searchData = Questionnaireresult.filter(item => parameters.nairename === item.nairename)
        return builder({
            pageNo: pageNo,
            totalCount: Questionnaireresult.length,
            data: searchData
        })
    }
}
const questionnaireAdd = (options) => {
    const data = JSON.parse(options.body).data
    data.id = Questionnaireresult.length + 1
    Questionnaireresult = Questionnaireresult.concat(data)
    return builder({
        totalCount: Questionnaireresult.length,
        data: Questionnaireresult
    })
}
const questionnaireEdit = (options) => {
    const data = JSON.parse(options.body).data
    for (const i in data) {
        for (const j in Questionnaireresult) {
            if (data.id === Questionnaireresult[j].id) {
                Questionnaireresult[j][i] = data[i]
            }
        }
    }
    return builder({
        totalCount: Questionnaireresult.length,
        data: Questionnaireresult
    })
}
const questionnaireDelete = (options) => {
    const id = JSON.parse(options.body).id
    Questionnaireresult = Questionnaireresult.filter((val) => {
        if (id !== val.id) {
            return val
        }
    })
    return builder({
        totalCount: Questionnaireresult.length,
        data: Questionnaireresult
    })
}
const questionsInit = (options) => {
    const parameters = getBody(options)
    const pageNo = parseInt(parameters.pageNo)
    if (parameters.title || parameters.questionstype) {
        let searchData = []
        if (parameters.title) {
            searchData = questionBankList.filter(item => parameters.title === item.title)
        } else if (parameters.questionstype) {
            searchData = questionBankList.filter(item => parameters.questionstype === item.questionType)
        } else {
            searchData = questionBankList.filter(item => parameters.questionstype === item.questionType && parameters.title === item.title)
        }
        return builder({
            pageNo: pageNo,
            totalCount: questionBankList.length,
            data: searchData
        })
    } else {
        return builder({
            pageNo: pageNo,
            totalCount: questionBankList.length,
            data: questionBankList
        })
    }
}
const questionsSearch = (options) => {
    return builder('操作成功')
}
const questionbankEdit = (options) => {
    const data = JSON.parse(options.body).data
    for (const i in data) {
        for (const j in questionBankList) {
            if (data.id === questionBankList[j].id) {
                questionBankList[j][i] = data[i]
            }
        }
    }
    return builder({
        totalCount: questionBankList.length,
        data: questionBankList
    })
}
const testsAdd = (options) => {
    const data = JSON.parse(options.body).data
    data.id = questionBankList.length + 1
    questionBankList = questionBankList.concat(data)
    return builder({
        totalCount: questionBankList.length,
        data: questionBankList
    })
}
const testsDelete = (options) => {
    const id = JSON.parse(options.body).id
    questionBankList = questionBankList.filter((val) => {
        if (id !== val.id) {
            return val
        }
    })
    return builder({
        totalCount: questionBankList.length,
        data: questionBankList
    })
}
// 题库模块
let questionBankList = [{
    id: 1,
    title: '题库一',
    questionType: '单选题',
    list: [],
    inputTime: '2021-11-15 09:21:56',
    inputUser: '张哥',
    lastModify: '测试用户',
    lastModifiedTime: '2021-11-15 09:30:56'
}, {
    id: 2,
    title: '题库二',
    questionType: '多选题',
    list: [],
    inputTime: '2021-11-15 09:21:56',
    inputUser: '张哥',
    lastModify: '测试用户',
    lastModifiedTime: '2021-11-15 09:30:56'
}]
const questionbankInit = (options) => {
    const parameters = getBody(options)
    const pageNo = parseInt(parameters.pageNo)
    if (parameters.title || parameters.questionstype) {
        let searchData = []
        if (parameters.title) {
            searchData = questionBankList.filter(item => parameters.title === item.title)
        } else if (parameters.questionstype) {
            searchData = questionBankList.filter(item => parameters.questionstype === item.questionType)
        } else {
            searchData = questionBankList.filter(item => parameters.questionstype === item.questionType && parameters.title === item.title)
        }
        return builder({
            pageNo: pageNo,
            totalCount: questionBankList.length,
            data: searchData
        })
    } else {
        return builder({
            pageNo: pageNo,
            totalCount: questionBankList.length,
            data: questionBankList
        })
    }
}
const questionbankAdd = (options) => {
    const data = JSON.parse(options.body).data
    data.id = questionBankList.length + 1
    questionBankList = questionBankList.concat(data)
    return builder({
        totalCount: questionBankList.length,
        data: questionBankList
    })
}
const questionbankDelete = (options) => {
    const id = JSON.parse(options.body).id
    questionBankList = questionBankList.filter((val) => {
        if (id !== val.id) {
            return val
        }
    })
    return builder({
        totalCount: questionBankList.length,
        data: questionBankList
    })
}

// 任务管理
let taskData = [{
    id: 1,
    taskname: '测试任务1',
    nairename: '调查问卷一',
    nairenumber: 1,
    allocated: 2,
    beallocated: 5,
    allocatedrate: '50%',
    completed: 9,
    incompleted: 2,
    completedrate: '16%',
    inputTime: '2021-11-15 09:21:56'
}, {
    id: 2,
    taskname: '回访跟踪',
    nairename: '调查问卷二',
    nairenumber: 11,
    allocated: 49,
    beallocated: 25,
    allocatedrate: '50%',
    completed: 19,
    incompleted: 24,
    completedrate: '66%',
    inputTime: '2021-11-15 09:46:56'
}, {
    id: 3,
    taskname: '问卷回访任务测试任务',
    nairename: '调查问卷三',
    nairenumber: 11,
    allocated: 31,
    beallocated: 18,
    allocatedrate: '50%',
    completed: 12,
    incompleted: 26,
    completedrate: '66%',
    inputTime: '2022-05-15 10:46:56'
}, {
    id: 4,
    taskname: '门锁回访测试',
    nairename: '调查问卷四',
    nairenumber: 11,
    allocated: 32,
    beallocated: 25,
    allocatedrate: '19%',
    completed: 19,
    incompleted: 74,
    completedrate: '76%',
    inputTime: '2022-04-15 09:46:56'
}]
const taskInit = (options) => {
    const parameters = getBody(options)
    const pageNo = parseInt(parameters.pageNo)
    if (parameters.taskname || parameters.nairename) {
        let searchData = []
        if (parameters.taskname) {
            searchData = taskData.filter(item => parameters.taskname === item.taskname)
        } else if (parameters.nairename) {
            searchData = taskData.filter(item => parameters.nairename === item.nairename)
        } else {
            searchData = taskData.filter(item => parameters.nairename === item.nairename && parameters.taskname === item.taskname)
        }
        return builder({
            pageNo: pageNo,
            totalCount: taskData.length,
            data: searchData
        })
    } else {
        return builder({
            pageNo: pageNo,
            totalCount: taskData.length,
            data: taskData
        })
    }
}
const taskAdd = (options) => {
    const data = JSON.parse(options.body).info
    data.id = taskData.length + 1
    taskData = taskData.concat(data)
    return builder({
        totalCount: taskData.length,
        data: taskData
    })
}
const taskEdit = (options) => {
    const data = JSON.parse(options.body)
    for (const j in taskData) {
        if (data.id === taskData[j].id) {
            taskData[j].nairename = data.info.nairename
            taskData[j].taskname = data.info.taskname
        }
    }
    return builder({
        totalCount: taskData.length,
        data: taskData
    })
}
const taskDelete = (options) => {
    const id = JSON.parse(options.body).id
    taskData = taskData.filter((val) => {
        if (id !== val.id) {
            return val
        }
    })
    return builder({
        totalCount: taskData.length,
        data: taskData
    })
}
// 查看明细模块
let detailsList = [{
    id: 1,
    sex: '男',
    openingRemarks: '您好',
    taskname: '测试任务1',
    nairename: '调查问卷一',
    nairestatus: '未分配',
    revisiter: '测试者',
    revisitdays: '2021-11-15 09:21:56',
    distributor: '张三',
    allocatetime: '2021-11-15 09:21:56',
    customer: '小明',
    phone1: '13160578965',
    phone2: '15988778965'
}, {
    id: 2,
    sex: '女',
    openingRemarks: '您好',
    taskname: '调试任务2',
    nairename: '调查问卷二',
    nairestatus: '已分配',
    revisiter: '测试者2',
    revisitdays: '2021-11-15 09:21:56',
    distributor: '张三',
    allocatetime: '2021-11-15 09:21:56',
    customer: '小王',
    phone1: '13160578965',
    phone2: '15988778965'
}]
const detailsInit = (options) => {
    const parameters = getBody(options)
    const pageNo = parseInt(parameters.pageNo)
    if (parameters.nairestatus || parameters.nairename || parameters.taskname) {
        let searchData = []
        if (parameters.nairestatus) {
            searchData = detailsList.filter(item => parameters.nairestatus === item.nairestatus)
        } else if (parameters.nairename) {
            searchData = detailsList.filter(item => parameters.nairename === item.nairename)
        } else if (parameters.taskname) {
            searchData = detailsList.filter(item => parameters.taskname === item.taskname)
        } else {
            searchData = detailsList.filter(item => parameters.nairestatus === item.nairestatus && parameters.nairename === item.nairename && parameters.taskname === item.taskname)
        }
        return builder({
            pageNo: pageNo,
            totalCount: detailsList.length,
            data: searchData
        })
    } else {
        return builder({
            pageNo: pageNo,
            totalCount: detailsList.length,
            data: detailsList
        })
    }
}
const detailsDelete = (options) => {
    const ids = JSON.parse(options.body).id
    if (ids instanceof Array) {
        detailsList = detailsList.filter((val) => {
            if (!ids.includes(val.id)) {
                return val
            }
        })
    } else {
        detailsList = detailsList.filter((val) => {
            if (ids !== val.id) {
                return val
            }
        })
    }

    return builder({
        totalCount: detailsList.length,
        data: detailsList
    })
}
// 回访问卷模块
const browsingInit = (options) => {
    const data = JSON.parse(options.body)
    const naireData = detailsList.find(item => item.id === data.id)
    return builder({
        naireData: naireData,
        data: []// browsingData
    })
}
// 问卷管理
Mock.mock(/\/visit\/questionnaire\/init/, 'post', questionnaireInit)
Mock.mock(/\/visit\/questionnaire\/add/, 'post', questionnaireAdd)
Mock.mock(/\/visit\/questionnaire\/edit/, 'post', questionnaireEdit)
Mock.mock(/\/visit\/questionnaire\/delete/, 'post', questionnaireDelete)
// 试题管理
Mock.mock(/\/visit\/questionnaire\/details/, 'post', questionsInit)
Mock.mock(/\/visit\/questionnaire\/testsSearch/, 'post', questionsSearch)
Mock.mock(/\/visit\/questionbank\/edit/, 'post', questionbankEdit)
Mock.mock(/\/visit\/questionnaire\/testsadd/, 'post', testsAdd)
Mock.mock(/\/visit\/questionnaire\/testsdelete/, 'post', testsDelete)
// 题库
Mock.mock(/\/visit\/questionbank\/init/, 'post', questionbankInit)
Mock.mock(/\/visit\/questionbank\/add/, 'post', questionbankAdd)
Mock.mock(/\/visit\/questionbank\/delete/, 'post', questionbankDelete)
// 任务管理
Mock.mock(/\/visit\/task\/init/, 'post', taskInit)
Mock.mock(/\/visit\/task\/add/, 'post', taskAdd)
Mock.mock(/\/visit\/task\/edit/, 'post', taskEdit)
Mock.mock(/\/visit\/task\/delete/, 'post', taskDelete)
Mock.mock(/\/visit\/details\/init/, 'post', detailsInit)
Mock.mock(/\/visit\/details\/delete/, 'post', detailsDelete)
// 回访问卷
Mock.mock(/\/visit\/details\/browsing/, 'post', browsingInit)
