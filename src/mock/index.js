import { isIE } from '@/utils/util'
import Vue from 'vue'
import config from '@/config/defaultSettings'
if (config.mock) {
  if (isIE()) {
    console.error('ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.')
  }
  Vue.prototype.mock = true
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  console.log('mock mounting')
  const Mock = require('mockjs2')
  require('../views/admin/mock/')
  require('../views/app/mock/')
  require('../views/callcenter/mock/')
  require('../views/chat/mock/')
  require('../views/crm/mock/')
  require('../views/exam/mock/')
  require('../views/express/mock/')
  require('../views/forum/mock/')
  require('../views/knowledge/mock/')
  require('../views/mail/mock/')
  require('../views/monitor/mock/')
  require('../views/quality/mock/')
  require('../views/sms/mock/')
  require('../views/test/mock/')
  require('../views/visit/mock/')
  require('../views/wechat/mock/')

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('mock mounted')
}
