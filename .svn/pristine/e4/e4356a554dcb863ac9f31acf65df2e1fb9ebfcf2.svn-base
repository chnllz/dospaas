import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'
let departmentData = [{
  department: '通讯录',
  children: [{
    department: '三国',
    children: [{
      department: '魏',
      id: '58',
      inputtime: '2020-07-15 15:06:58',
      inputuser: 'maoyuping',
      listorder: '0',
      psnum_tag_department: ['0', '17'],
      remarks: '',
      select_type: '0',
      snum_tag_department: '58',
      tag_type: '0',
      updatetime: '0000-00-0'
    }, {
      department: '蜀',
      id: '59',
      inputtime: '2020-07-15 15:06:58',
      inputuser: 'maoyuping',
      listorder: '0',
      psnum_tag_department: ['0', '17'],
      remarks: '',
      select_type: '0',
      snum_tag_department: '59',
      tag_type: '0',
      updatetime: '0000-00-0'
    }, {
      department: '吴',
      id: '60',
      inputtime: '2020-07-15 15:06:58',
      inputuser: 'maoyuping',
      listorder: '0',
      psnum_tag_department: ['0', '17'],
      remarks: '',
      select_type: '0',
      snum_tag_department: '60',
      tag_type: '0',
      updatetime: '0000-00-0'
    }],
    id: '17',
    inputtime: '2020-03-28 09:39:07',
    inputuser: 'admin',
    psnum_tag_department: ['0'],
    remarks: '测试',
    snum_tag_department: '',
    updatetime: '2020-04-03 18:21:44',
    updateuser: ''
  }, {
    department: '晋',
    id: '18',
    inputtime: '2020-03-28 09:39:07',
    inputuser: 'admin',
    psnum_tag_department: ['0'],
    remarks: '测试',
    snum_tag_department: '',
    updatetime: '2020-04-03 18:21:44',
    updateuser: ''
  }],
  id: '0',
  snum_tag_department: ''
}]
const departmentShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  return builder({
    pageNo: pageNo,
    totalCount: departmentData.length,
    data: departmentData
  })
}
const departmentadd = (options) => {
  const data = JSON.parse(options.body).data
  data.id = departmentData.length + 1
  departmentData = departmentData.concat(data)
  return builder({
    totalCount: departmentData.length,
    data: departmentData
  })
}
const departmentdelete = (options) => {
  const id = JSON.parse(options.body).id
  departmentData = departmentData.filter((val) => {
    if (id !== val.id) {
      return val
    }
  })
  return builder({
    totalCount: departmentData.length,
    data: departmentData
  })
}
const departmentedit = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  for (const i in data) {
    for (const j in departmentData) {
      if (data.id === departmentData[j].id) {
        departmentData[j][i] = data[i]
      }
    }
  }
  return builder({
    totalCount: departmentData.length,
    data: departmentData
  })
}

let MemberData = [{
  id: '27',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '10000',
  name: '刘备',
  job: '汉先主',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}, {
  id: '28',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '10010',
  name: '关羽',
  job: '五虎上将',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}, {
  id: '29',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '10086',
  name: '张飞',
  job: '五虎上将',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}, {
  id: '30',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '10011',
  name: '赵云',
  job: '五虎上将',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}, {
  id: '31',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '10012',
  name: '黄忠',
  job: '五虎上将',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}, {
  id: '32',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '100123',
  name: '马超',
  job: '五虎上将',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}, {
  id: '33',
  inputtime: '2020-03-28 09:47:40',
  inputuser: 'admin',
  listorder: '0',
  remarks: '',
  rsnum_tag_member: ['0', '17', '59'],
  department: '三国/蜀',
  telephone: '',
  snum_tag_listdata: '29',
  phone: '13800138000',
  name: '诸葛亮',
  job: '蜀国军师',
  updatetime: '2020-07-15 20:26:11',
  updateuser: ''
}]

const MemberShow = (options) => {
  const parameters = getQueryParameters(options)
  const pageNo = parseInt(parameters.pageNo)
  return builder({
    pageNo: pageNo,
    totalCount: MemberData.length,
    data: MemberData
  })
}
const Memberadd = (options) => {
  const data = JSON.parse(options.body).data
  data.id = MemberData.length + 1
  MemberData = MemberData.concat(data)
  console.log(MemberData)
  return builder({
    totalCount: MemberData.length,
    data: MemberData
  })
}
const Memberdelete = (options) => {
  const id = JSON.parse(options.body).id
  MemberData = MemberData.filter((val) => {
    if (id !== val.id) {
      return val
    }
  })
  return builder({
    totalCount: MemberData.length,
    data: MemberData
  })
}
const Memberedit = (options) => {
  const data = JSON.parse(options.body).data
  console.log(data)
  for (const i in data) {
    for (const j in MemberData) {
      if (data.id === MemberData[j].id) {
        MemberData[j][i] = data[i]
      }
    }
  }
  return builder({
    totalCount: MemberData.length,
    data: MemberData
  })
}

const directories = [{
  department: '通讯录',
  id: '0',
  key: '0',
  children: [{
    department: '三国',
    id: '17',
    key: '17',
    children: [{
      department: '魏',
      id: '58',
      key: '58'
    }, {
      department: '蜀',
      id: '59',
      key: '59',
      children: [{
        id: '29',
        department: '(张飞)13800138000',
        key: '13800138000'
      }]
    }, {
      department: '吴',
      id: '60',
      key: '60'
    }]

  }, {
    department: '晋',
    id: '18',
    key: '18'
  }]
}]

const directoriesData = (options) => {
  return builder({
    data: directories
  })
}
Mock.mock(/\/directories\/department\/init/, 'get', departmentShow)
Mock.mock(/\/directories\/department\/add/, 'post', departmentadd)
Mock.mock(/\/directories\/department\/delete/, 'post', departmentdelete)
Mock.mock(/\/directories\/department\/edit/, 'post', departmentedit)

Mock.mock(/\/directories\/member\/init/, 'get', MemberShow)
Mock.mock(/\/directories\/member\/add/, 'post', Memberadd)
Mock.mock(/\/directories\/member\/delete/, 'post', Memberdelete)
Mock.mock(/\/directories\/member\/edit/, 'post', Memberedit)

Mock.mock(/\/directories\/directories\/init/, 'get', directoriesData)
