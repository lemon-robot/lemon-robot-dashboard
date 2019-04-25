import $define from '@/define'
import axios from 'axios'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    [$define.SERVICE.LOGIN.LOGIN_FORM.ACT_LOGIN] ({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        axios.post($define.URL.USER.LOGIN, loginForm).then((resp) => {
          commit($define.SERVICE.GLOBAL.USER.MUT_LOGIN_STATE, true)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
