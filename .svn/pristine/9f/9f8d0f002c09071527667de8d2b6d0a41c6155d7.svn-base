import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
let bankData = [{
  id: 1,
  bankName: '这是第一个题库',
  questionTotal: '25',
  single: '5',
  multiple: '5',
  judge: '5',
  fill: '5',
  briefAnswer: '5',
  inputuser: 'admin',
  inputtime: '2020-10-16 16:30:56',
  topics_id: [1, 2, 3, 4, 5]
}, {
  id: 2,
  bankName: '这是第N个题库',
  questionTotal: '25',
  single: '5',
  multiple: '5',
  judge: '5',
  fill: '5',
  briefAnswer: '5',
  inputuser: 'admin',
  inputtime: '2020-10-16 16:30:56',
  topics_id: [1, 2, 3, 4, 5]
}, {
  id: 3,
  bankName: '这是第三个题库',
  questionTotal: '75',
  single: '15',
  multiple: '15',
  judge: '15',
  fill: '15',
  briefAnswer: '15',
  inputuser: 'admin',
  inputtime: '2020-10-16 16:30:56',
  topics_id: [1, 2, 3, 4, 5]
}, {
  id: 4,
  bankName: '这是第四个题库',
  questionTotal: '15',
  single: '1',
  multiple: '2',
  judge: '3',
  fill: '4',
  briefAnswer: '5',
  inputuser: 'admin',
  inputtime: '2020-10-16 16:30:56',
  topics_id: [1, 2, 3, 4, 5]
}]
const bankShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  console.log(parameters)
  const questionstype = parameters.questionstype
  const questionTitle = parameters.questionTitle
  if (!questionTitle && questionstype === '0' || !questionstype) {
    return builder({
      pageNo: pageNo,
      totalCount: bankData.length,
      data: bankData
    })
  } else {
    bankData = bankData.filter((val) => {
      if (questionTitle === val.questionTitle) {
        return val
      }
    })
    return builder({
      pageNo: pageNo,
      totalCount: bankData.length,
      data: bankData
    })
  }
}
const bankadd = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  data.id = bankData.length + 1
  bankData = bankData.concat(data)
  console.log(bankData)
  return builder({
    totalCount: bankData.length,
    data: bankData
  })
}
const bankdelete = (options) => {
  const id = JSON.parse(options.body).id
  bankData = bankData.filter((val) => {
    if (id !== val.id) {
      return val
    }
  })
  return builder({
    totalCount: bankData.length,
    data: bankData
  })
}
const bankedit = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  for (const i in data) {
    for (const j in bankData) {
      if (data.id === bankData[j].id) {
        bankData[j][i] = data[i]
      }
    }
  }
  return builder({
    totalCount: bankData.length,
    data: bankData
  })
}
let questionData = [{
  id: 1,
  questionTitle: '道路交通安全工作，应当遵循依法管理、方便群众的原则，保障道路交通( )、安全、畅通。',
  questionType: 'single',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42',
  answer: 'B',
  keyWord: '1',
  judge: '0',
  list: ['便捷', '有序', '经济', '快速'],
  fill: [],
  analysis: '这是一个非常非常厉害的题目'
}, {
  id: 2,
  questionTitle: '各级政府应当保障道路交通安全管理工作与经济建设和(  )发展相适应。',
  questionType: 'single',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42',
  answer: 'B',
  keyWord: '1',
  judge: '0',
  list: ['社会', '时代', '建设', '组织'],
  fill: [],
  analysis: ''
}, {
  id: 3,
  questionTitle: '交通信号灯包括(  )',
  questionType: 'multiple',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42',
  answer: 'A、B、C',
  keyWord: '1',
  judge: '0',
  list: ['绿灯信号', '红灯信号', '黄灯信号 ', '停止信号'],
  fill: [],
  analysis: ''
}, {
  id: 4,
  questionTitle: '骑车可以推行、绕行闯越红灯。',
  questionType: 'judge',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42',
  answer: '',
  keyWord: '',
  judge: '0',
  list: [''],
  fill: [],
  analysis: ''
}, {
  id: 5,
  questionTitle: '机动车行经没有交通信号的道路时，遇有行人横过道路，应当___',
  questionType: 'fills',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42',
  answer: '',
  keyWord: '',
  judge: '0',
  list: [''],
  fill: ['减速慢行'],
  allow: '1',
  analysis: ''
}, {
  id: 6,
  questionTitle: '对道路交通安全违法行为的处罚种类包括哪几种',
  questionType: 'briefAnswer',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42',
  answer: '',
  keyWord: '',
  judge: '0',
  list: [''],
  fill: [],
  analysis: ''
}]
const quesShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  return builder({
    pageNo: pageNo,
    totalCount: questionData.length,
    data: questionData
  })
}
const quesadd = (options) => {
  const data = JSON.parse(options.body).data
  data.id = questionData.length + 1
  questionData = questionData.concat(data)
  console.log(questionData)
  return builder({
    totalCount: questionData.length,
    data: questionData
  })
}
const quesedit = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  for (const i in data) {
    for (const j in questionData) {
      if (data.id === questionData[j].id) {
        questionData[j][i] = data[i]
      }
    }
  }
  return builder({
    totalCount: questionData.length,
    data: questionData
  })
}
const quesdelete = (options) => {
  const id = JSON.parse(options.body).id
  if (id.length) {
    for (const i in id) {
      questionData = questionData.filter((val) => {
        if (id[i] !== val.id) {
          return val
        }
      })
    }
  } else {
    questionData = questionData.filter((val) => {
      if (id !== val.id) {
        return val
      }
    })
  }
  return builder({
    totalCount: questionData.length,
    data: questionData
  })
}
let TestpaperData = [{
  id: 1,
  papername: '这是第一次测试',
  single: [{
    id: 1,
    questionTitle: '道路交通安全工作，应当遵循依法管理、方便群众的原则，保障道路交通( )、安全、畅通。',
    questionType: 'single',
    answer: 'B',
    keyWord: '1',
    judge: '0',
    list: ['便捷', '有序', '经济', '快速'],
    fill: [],
    analysis: '这是一个非常非常厉害的题目',
    score: 10
  }, {
    id: 2,
    questionTitle: '各级政府应当保障道路交通安全管理工作与经济建设和(  )发展相适应。',
    questionType: 'single',
    answer: 'B',
    keyWord: '1',
    judge: '0',
    list: ['社会', '时代', '建设', '组织'],
    fill: [],
    analysis: '',
    score: 10
  }],
  multiple: [{
    id: 1,
    questionTitle: '交通信号灯包括(  )',
    questionType: 'multiple',
    answer: 'A、B、C',
    keyWord: '1',
    judge: '0',
    list: ['绿灯信号', '红灯信号', '黄灯信号 ', '停止信号'],
    fill: [],
    analysis: '',
    score: 10
  }],
  judge: [{
    id: 4,
    questionTitle: '骑车可以推行、绕行闯越红灯。',
    questionType: 'judge',
    answer: '0',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '',
    score: 10
  }],
  fill: [{
    id: 5,
    questionTitle: '机动车行经没有交通信号的道路时，遇有行人横过道路，应当___,___',
    questionType: 'fills',
    answerfill: {
      0: '减速慢行',
      1: '观察行人'
    },
    keyWord: '',
    judge: '0',
    list: [''],
    fill: ['', ''],
    analysis: '',
    score: 10
  }, {
    id: 5,
    questionTitle: '机动车行经没有交通信号的道路时，遇有行人横过道路，应当___',
    questionType: 'fills',
    answerfill: {
      0: '减速慢行'
    },
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [''],
    analysis: '',
    score: 10
  }],
  briefAnswer: [{
    id: 6,
    questionTitle: '对道路交通安全违法行为的处罚种类包括哪几种',
    questionType: 'briefAnswer',
    inputuser: 'admin',
    inputtime: '2020-9-24 19:10:42',
    lastModify: 'admin',
    lastModifiedTime: '2020-9-24 19:10:42',
    answer: '',
    keyWord: '警告;罚款;暂扣;吊销驾驶证;拘留',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '警告、罚款、暂扣或者吊销驾驶证、拘留。',
    score: 10
  }],
  scoreTotal: 100,
  questionTotal: 60,
  // fixed 固定，random 随机
  papertype: 'fixed',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:55:52',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:55:59'
}, {
  id: 2,
  papername: '这是第二次测试',
  single: [{
    id: 1,
    questionTitle: '道路交通安全工作，应当遵循依法管理、方便群众的原则，保障道路交通( )、安全、畅通。',
    questionType: 'single',
    answer: '1',
    keyWord: '1',
    judge: '0',
    list: ['便捷', '有序', '经济', '快速'],
    fill: [],
    analysis: '这是一个非常非常厉害的题目',
    score: 10
  }, {
    id: 2,
    questionTitle: '各级政府应当保障道路交通安全管理工作与经济建设和(  )发展相适应。',
    questionType: 'single',
    answer: '1',
    keyWord: '1',
    judge: '0',
    list: ['社会', '时代', '建设', '组织'],
    fill: [],
    analysis: '',
    score: 10
  }],
  multiple: [{
    id: 1,
    questionTitle: '交通信号灯包括(  )',
    questionType: 'multiple',
    answer: '1',
    keyWord: '1',
    judge: '0',
    list: ['绿灯信号', '红灯信号', '黄灯信号 ', '停止信号'],
    fill: [],
    analysis: '',
    score: 10
  }],
  judge: [{
    id: 4,
    questionTitle: '骑车可以推行、绕行闯越红灯。',
    questionType: 'judge',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '',
    score: 10
  }],
  fill: [{
    id: 5,
    questionTitle: '机动车行经没有交通信号的道路时，遇有行人横过道路，应当___',
    questionType: 'fills',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [''],
    analysis: '',
    score: 10
  }],
  briefAnswer: [{
    id: 6,
    questionTitle: '对道路交通安全违法行为的处罚种类包括哪几种',
    questionType: 'briefAnswer',
    inputuser: 'admin',
    inputtime: '2020-9-24 19:10:42',
    lastModify: 'admin',
    lastModifiedTime: '2020-9-24 19:10:42',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '',
    score: 10
  }],
  scoreTotal: 100,
  questionTotal: 60,
  // fixed 固定，random 随机
  papertype: 'fixed',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:55:52',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:55:59'
}, {
  id: 3,
  papername: '这是第三次测试',
  single: [{
    id: 1,
    questionTitle: '道路交通安全工作，应当遵循依法管理、方便群众的原则，保障道路交通( )、安全、畅通。',
    questionType: 'single',
    answer: '1',
    keyWord: '1',
    judge: '0',
    list: ['便捷', '有序', '经济', '快速'],
    fill: [],
    analysis: '这是一个非常非常厉害的题目',
    score: 10
  }, {
    id: 2,
    questionTitle: '各级政府应当保障道路交通安全管理工作与经济建设和(  )发展相适应。',
    questionType: 'single',
    answer: '1',
    keyWord: '1',
    judge: '0',
    list: ['社会', '时代', '建设', '组织'],
    fill: [],
    analysis: '',
    score: 10
  }],
  multiple: [{
    id: 1,
    questionTitle: '交通信号灯包括(  )',
    questionType: 'multiple',
    answer: '1',
    keyWord: '1',
    judge: '0',
    list: ['绿灯信号', '红灯信号', '黄灯信号 ', '停止信号'],
    fill: [],
    analysis: '',
    score: 10
  }],
  judge: [{
    id: 4,
    questionTitle: '骑车可以推行、绕行闯越红灯。',
    questionType: 'judge',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '',
    score: 10
  }],
  fill: [{
    id: 5,
    questionTitle: '机动车行经没有交通信号的道路时，遇有行人横过道路，应当___',
    questionType: 'fills',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [''],
    analysis: '',
    score: 10
  }],
  briefAnswer: [{
    id: 6,
    questionTitle: '对道路交通安全违法行为的处罚种类包括哪几种',
    questionType: 'briefAnswer',
    inputuser: 'admin',
    inputtime: '2020-9-24 19:10:42',
    lastModify: 'admin',
    lastModifiedTime: '2020-9-24 19:10:42',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '',
    score: 10
  }, {
    id: 6,
    questionTitle: '对道路交通安全违法行为的处罚种类包括哪几种',
    questionType: 'briefAnswer',
    inputuser: 'admin',
    inputtime: '2020-9-24 19:10:42',
    lastModify: 'admin',
    lastModifiedTime: '2020-9-24 19:10:42',
    answer: '',
    keyWord: '',
    judge: '0',
    list: [''],
    fill: [],
    analysis: '',
    score: 10
  }],
  scoreTotal: 100,
  questionTotal: 60,
  // fixed 固定，random 随机
  papertype: 'random',
  inputuser: 'admin',
  inputtime: '2020-9-24 19:55:52',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:55:59'
}]
const TestpaperShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  return builder({
    pageNo: pageNo,
    totalCount: TestpaperData.length,
    data: TestpaperData
  })
}
const Testpaperadd = (options) => {
  const data = JSON.parse(options.body).data
  data.id = TestpaperData.length + 1
  TestpaperData = TestpaperData.concat(data)
  console.log(TestpaperData)
  return builder({
    totalCount: TestpaperData.length,
    data: TestpaperData
  })
}
const Testpaperedit = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  for (const i in data) {
    for (const j in TestpaperData) {
      if (data.id === questionData[j].id) {
        TestpaperData[j][i] = data[i]
      }
    }
  }
  return builder({
    totalCount: TestpaperData.length,
    data: TestpaperData
  })
}
const Testpaperdelete = (options) => {
  const id = JSON.parse(options.body).id
  TestpaperData = TestpaperData.filter((val) => {
    if (id !== val.id) {
      return val
    }
  })
  return builder({
    totalCount: questionData.length,
    data: questionData
  })
}
let examData = [{
  id: 1,
  testpaperid: 1,
  examname: '这是交通规则考试',
  explain: '这是考试说明',
  examstatus: '进行中',
  paperstatus: '进行中',
  begintime: '2020-10-20 10:44:04',
  endtime: '2020-10-30 10:44:19',
  allowable: 5,
  timeLimit: 120,
  qualified: 60,
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42'
}, {
  id: 2,
  testpaperid: 2,
  examname: '这是交通规则考试2',
  explain: '',
  examstatus: '进行中',
  paperstatus: '进行中',
  begintime: '2020-10-25 14:39:04',
  endtime: '2020-10-30 10:44:19',
  allowable: 5,
  timeLimit: 120,
  qualified: 60,
  inputuser: 'admin',
  inputtime: '2020-9-24 19:10:42',
  lastModify: 'admin',
  lastModifiedTime: '2020-9-24 19:10:42'
}]
const examShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  for (const j in examData) {
    for (const i in TestpaperData) {
      if (examData[j].testpaperid === TestpaperData[i].id) {
        const index = TestpaperData[i].id
        const concat = TestpaperData[i]
        delete concat.id
        Object.assign(examData[j], concat)
        TestpaperData[i].id = index
      }
    }
  }
  return builder({
    pageNo: pageNo,
    totalCount: examData.length,
    data: examData
  })
}
const examadd = (options) => {
  const data = JSON.parse(options.body).data
  data.id = examData.length + 1
  examData = examData.concat(data)
  console.log(TestpaperData)
  for (const j in examData) {
    for (const i in TestpaperData) {
      if (examData[j].testpaperid === TestpaperData[i].id) {
        const index = TestpaperData[i].id
        const concat = TestpaperData[i]
        delete concat.id
        Object.assign(examData[j], concat)
        TestpaperData[i].id = index
      }
      console.log(examData[j])
    }
  }
  return builder({
    totalCount: examData.length,
    data: examData
  })
}
const examedit = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  for (const i in data) {
    for (const j in examData) {
      if (data.id === questionData[j].id) {
        examData[j][i] = data[i]
      }
    }
  }
  return builder({
    totalCount: examData.length,
    data: examData
  })
}
const examdelete = (options) => {
  const id = JSON.parse(options.body).id
  examData = examData.filter((val) => {
    if (id !== val.id) {
      return val
    }
  })
  return builder({
    totalCount: questionData.length,
    data: questionData
  })
}
const myExamData = [{
  id: 1,
  testpaperid: 1,
  examid: 1,
  examinee: '张三',
  department: '调研部',
  makespan: '2020-10-20 20:27:37',
  totalScore: 100,
  grades: '优秀',
  times: 0,
  average: 90,
  state: '未考',
  tested: []
}, {
  id: 2,
  testpaperid: 2,
  examid: 2,
  examinee: '李四',
  department: '调研部',
  makespan: '2020-10-20 20:27:37',
  totalScore: 100,
  grades: '优秀',
  times: 1,
  average: 90,
  state: '考试中',
  tested: [{
    makespan: '2020-10-20 11:22:48',
    reviser: '刘备',
    grades: 60,
    spent: 120,
    single: ['A', 'B'],
    multiple: {
      0: ['A', 'B', 'C']
    },
    judge: ['0'],
    fill: [{
      0: '减速慢行',
      1: '加速通过路口'
    }, {
      0: '减速慢行'
    }],
    briefAnswer: ['警告、罚款']
  }]
}, {
  id: 3,
  testpaperid: 1,
  examid: 1,
  examinee: '王二',
  department: '调研部',
  makespan: '2020-10-20 20:27:37',
  totalScore: 100,
  grades: '优秀',
  times: 2,
  average: 90,
  state: '已结束',
  tested: [{
    makespan: '2020-10-20 11:22:48',
    reviser: '张飞',
    grades: 60,
    spent: 120,
    single: ['A', 'B'],
    multiple: {
      0: ['A', 'B', 'C']
    },
    judge: ['0'],
    fill: [{
      0: '减速慢行',
      1: '加速通过路口'
    }, {
      0: '减速慢行'
    }],
    briefAnswer: ['警告、罚款']
  }, {
    makespan: '2020-10-20 11:22:50',
    reviser: '关羽',
    grades: 90,
    spent: 80,
    single: ['A', 'B'],
    multiple: {
      0: ['A', 'B', 'C']
    },
    judge: ['0'],
    fill: [{
      0: '减速慢行',
      1: '加速通过路口'
    }, {
      0: '减速慢行'
    }],
    briefAnswer: ['警告、罚款']
  }],
  timeLimit: 120,
  qualified: 60
}, {
  id: 4,
  testpaperid: 4,
  examid: 2,
  examinee: '麻子',
  department: '调研部',
  makespan: '2020-10-20 20:27:37',
  totalScore: 100,
  grades: '优秀',
  times: 0,
  average: 90,
  state: '考试中',
  tested: []
}]
const myExamShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  for (const i in myExamData) {
    for (const j in examData) {
      if (examData[j].id === myExamData[i].examid) {
        const i = examData[j].id
        delete examData[j].id
        Object.assign(myExamData[i], examData[j])
        examData[j].id = i
      }
    }
    for (const j in TestpaperData) {
      if (TestpaperData[j].id === myExamData[i].testpaperid) {
        const i = TestpaperData[j].id
        delete TestpaperData[j].id
        Object.assign(myExamData[i], TestpaperData[j])
        TestpaperData[j].id = i
      }
    }
  }
  console.log(myExamData)
  return builder({
    pageNo: pageNo,
    totalCount: myExamData.length,
    data: myExamData
  })
}

Mock.mock(/\/exam\/questionbank\/init/, 'get', bankShow)
Mock.mock(/\/exam\/questionbank\/add/, 'post', bankadd)
Mock.mock(/\/exam\/questionbank\/delete/, 'post', bankdelete)
Mock.mock(/\/exam\/questionbank\/edit/, 'post', bankedit)

Mock.mock(/\/exam\/question\/init/, 'get', quesShow)
Mock.mock(/\/exam\/question\/add/, 'post', quesadd)
Mock.mock(/\/exam\/question\/edit/, 'post', quesedit)
Mock.mock(/\/exam\/question\/delete/, 'post', quesdelete)

Mock.mock(/\/exam\/testpaper\/init/, 'get', TestpaperShow)
Mock.mock(/\/exam\/testpaper\/add/, 'post', Testpaperadd)
Mock.mock(/\/exam\/testpaper\/edit/, 'post', Testpaperedit)
Mock.mock(/\/exam\/testpaper\/delete/, 'post', Testpaperdelete)

Mock.mock(/\/exam\/exam\/init/, 'get', examShow)
Mock.mock(/\/exam\/exam\/add/, 'post', examadd)
Mock.mock(/\/exam\/exam\/edit/, 'post', examedit)
Mock.mock(/\/exam\/exam\/delete/, 'post', examdelete)

Mock.mock(/\/exam\/myExam\/init/, 'get', myExamShow)
