import Vue from 'vue'
import router from './router'
import store from './store'
import storage from '@/utils/storage'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle } from '@/utils/domUtil'
import VueCookies from 'vue-cookies'
import { axios } from './utils/request'
import cloneDeep from 'lodash.clonedeep'
import { Base64 } from 'js-base64'

Vue.use(VueCookies)
const getQueryVariable = (variable) => {
  const search = window.location.search.substring(1)
  const vars = search.split('&')
  for (const i in vars) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1])
    }
  }
  return null
}

// 设置cookie的存储路径和生命周期
VueCookies.config('Session', process.env.VUE_APP_BASE_URL)
NProgress.configure({ showSpinner: false }) // NProgress Configuration
if (!storage.get('rememberMe') && VueCookies.get('Login') !== 'true') {
  storage.remove('Access-Token')
}

const reSetRouters = (list) => {
  let childRoute = []
  list.forEach(item => {
    if (!item.children) {
      childRoute = childRoute.concat([item])
    } else {
      childRoute = childRoute.concat(reSetRouters(item.children))
    }
  })
  return childRoute
}

router.beforeEach((to, from, next) => {
  Vue.prototype.currentRoute = to
  NProgress.start() // start progress bar
  const domTitle = store.getters.setting.title
  if (domTitle) {
    if (to.meta && to.meta.title) {
      setDocumentTitle(`${to.meta.title} - ${domTitle}`)
    } else {
      setDocumentTitle(`${domTitle}`)
    }
  }
  if (storage.get('Access-Token')) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.result && res.result.role
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            const reChild = cloneDeep(store.getters.addRouters)
            reChild[0].children = reSetRouters(reChild[0].children)
            router.addRoutes(reChild)
            next({ ...to, replace: true })
          })
        }).catch((error) => {
          store.commit('NOTIFICATION', error)
          store.dispatch('Logout').then(res => {
            next({ path: '/user/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (location.search.includes('authentication')) {
      const code = getQueryVariable('code')
      const message = getQueryVariable('message')
      const authentication = getQueryVariable('authentication')
      const obj = {
        code: Number(code),
        message: message
      }
      if (code !== '0') {
        store.commit('NOTIFICATION', obj)
        setTimeout(() => {
          location.href = location.origin + process.env.VUE_APP_BASE_URL
        }, 3000)
        return
      }
      const str = Base64.decode(authentication) || '{}'
      let authenticationObj = {}
      authenticationObj = JSON.parse(str)
      axios({
        url: authenticationObj.url,
        params: { authentication }
      }).then(res => {
        if (res.code === 0 && res.result && res.result.token) {
          storage.set('Access-Token', res.result.token)
          let queryList = window.location.search.substring(1).split('&')
          queryList = queryList.filter(item => {
            return item.split('=')[0] !== 'authentication' && item.split('=')[0] !== 'code' && item.split('=')[0] !== 'message'
          })
          let url = window.location.origin + window.location.pathname
          if (queryList.length > 0) {
            url += '?' + queryList.join('&')
          }
          location.href = url
        } else {
          setTimeout(() => {
            location.href = location.origin + process.env.VUE_APP_BASE_URL
          }, 3000)
        }
      })
    } else if (to.meta.requireLogin === false) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login' })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
