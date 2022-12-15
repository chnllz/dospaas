import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import appStore from './modules/appStore'

// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import getters from './getters'
import defaultSettings from '@/config/defaultSettings'

let env = process.env || {}
env = JSON.parse(JSON.stringify(env))
env.VUE_APP_API_BASE_URL = (process.env.NODE_ENV === 'development' ? '/' + defaultSettings.devServer : '') + env.VUE_APP_API_BASE_URL

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    appStore
  },
  state: {
    env: env
  },
  mutations: {

  },
  actions: {

  },
  getters
})
