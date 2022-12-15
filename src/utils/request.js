import axios from 'axios'
import store from '@/store'
import storage from '@/utils/storage'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import Vue from 'vue'
import defaultSettings from '@/config/defaultSettings'

let isLoginTips = false

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: (process.env.NODE_ENV === 'development' ? '/' + defaultSettings.devServer : '') + process.env.VUE_APP_API_BASE_URL,
  timeout: 30000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  store.commit('SET_GLOBAL_SPIN', false)
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    notification.warning({
      message: '请求超时',
      description: '请刷新重试或联系系统管理员。管理员专用信息：' + error.config.url
    })
  } else {
    const status = error.response.status
    if (status === 403) {
      notification.error({
        message: '403',
        description: '请联系系统管理员。管理员专用信息：' + error.response.data
      })
    } else if (status === 404) {
      notification.error({
        message: '404',
        description: '请联系系统管理员。管理员专用信息：' + error.config.url
      })
    } else if (status === 500) {
      notification.error({
        message: '500',
        description: '请联系系统管理员。管理员专用信息：' + error.response.data
      })
    } else {
      notification.error({
        message: '系统信息',
        description: '未知错误，请联系系统管理员'
      })
    }
  }
  return new Promise(() => { })
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get('Access-Token')
  config.headers['Device-Type'] = 'desktop'
  if (token && window.location.pathname !== process.env.VUE_APP_BASE_URL + 'LoadPage/') {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (config.loading === true) {
    store.commit('SET_GLOBAL_SPIN', true)
  }
  // axios统一使用post进行传参
  config.method = 'post'
  if (Vue.prototype.mock) {
    const data = {
      url: config.url,
      data: config.data,
      params: config.params
    }
    console.log('%c请求参数=>', 'background-color: green; color: white; padding: 2px 5px; border-radius: 2px;', data)
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  if (Vue.prototype.mock) {
    console.log('%c返回结果=>', 'background-color: green; color: white; padding: 2px 5px;', response.data)
  }
  if (response.config.loading === true) {
    store.commit('SET_GLOBAL_SPIN', false)
  }

  // Blob处理
  if (response.data instanceof Blob) {
    if (response.data.type === 'application/octet-stream') {
      const element = document.createElement('a')
      const url = window.URL.createObjectURL(response.data)
      const disposition = response.headers['content-disposition']
      const fileName = disposition.match(/(?<=fileName[=*]+["']).*?(?=["'])/i)
      element.download = fileName[0]
      element.href = url
      element.click()
      window.URL.revokeObjectURL(url)
      return new Promise(() => { })
    } else if (response.data.type === 'application/json') {
      const text = response.data.text()
      text.then((json) => {
        const data = JSON.parse(json)
        return responseHandler(response, data)
      })
    } else {
      notification.error({
        message: '系统信息',
        description: '未知错误，请联系系统管理员'
      })
      return new Promise(() => { })
    }
  } else {
    // Json处理
    return responseHandler(response)
  }
}, errorHandler)

const responseHandler = (response, data) => {
  data = data || response.data

  const code = data.code
  const message = data.message

  if (code === -1) {
    //  用户登录状态失效，请重新登录
    if (!isLoginTips) {
      notification.info({
        message: '系统信息',
        description: message
      })
      isLoginTips = true
      if (storage.get('Access-Token')) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            isLoginTips = false
            window.location.reload()
          }, 1500)
        })
      } else {
        if (Vue.prototype.currentRoute.meta.requireLogin === false) {
          // loadPage加载页面时无须验证用户是否登录了系统，但加载的页面请求的后端接口可能又要求用户要登录系统，此处判断是为了避免页面跳转死循环
          setTimeout(() => {
            isLoginTips = false
            window.location.href = process.env.VUE_APP_BASE_URL
          }, 1500)
        } else {
          setTimeout(() => {
            isLoginTips = false
            window.location.reload()
          }, 1500)
        }
      }
    }
    return new Promise(() => { })
  } else if (code === -2) {
    // 您没有系统任何权限，请联系系统管理员授权后重试
    notification.info({
      message: '系统信息',
      description: message
    })
    return Promise.reject(data)
  } else if (code === 1) {
    if (response.config.tips !== false) {
      notification.error({
        message: '操作失败',
        description: message
      })
    }
    return data
  } else {
    // 正常返回
    return data
  }
}

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
