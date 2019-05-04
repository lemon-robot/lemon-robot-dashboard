import $define from '@/define'
import axios from 'axios'
import UserLoginForm from '@/model/user-login-form'

export default {
  state: {},
  getters: {
    [$define.SERVICE.LOGIN.LOGIN_FORM.GET_CACHE_LOGIN_FORM] (state) {
      let loginFormStr = localStorage[$define.SERVICE.LOGIN.LOGIN_FORM.STORAGE_KEY_CACHE_LOGIN_FORM]
      console.log(loginFormStr)
      if (loginFormStr === undefined || loginFormStr === '') {
        return new UserLoginForm()
      }
      return JSON.parse(loginFormStr)
    }
  },
  mutations: {
    [$define.SERVICE.LOGIN.LOGIN_FORM.MUT_SAVE_CACHE_LOGIN_FORM] (state, loginForm) {
      localStorage[$define.SERVICE.LOGIN.LOGIN_FORM.STORAGE_KEY_CACHE_LOGIN_FORM] = JSON.stringify(loginForm)
    }
  },
  actions: {
    [$define.SERVICE.LOGIN.LOGIN_FORM.ACT_LOGIN] ({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        axios.post($define.URL.USER.LOGIN, loginForm).then((resp) => {
          if (resp.data.success) {
            if (loginForm.rememberPassword) {
              commit($define.SERVICE.LOGIN.LOGIN_FORM.MUT_SAVE_CACHE_LOGIN_FORM, loginForm)
            }
            commit($define.SERVICE.GLOBAL.USER.MUT_LOGIN_TOKEN, resp.data.data)
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
