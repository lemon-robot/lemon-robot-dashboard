import $define from '@/define'
import axios from 'axios'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    [$define.SERVICE.LOGIN.LOGIN_FORM.ACT_LOGIN] ({ commit }, info) {
      return new Promise((resolve, reject) => {
        axios.post($define.URL.USER.LOGIN, {
          number: 'lemonrobot',
          password: '5055814a-3620-4e6f-b552-12dcae71c150'
        }).then((resp) => {
          console.log(resp)
          commit($define.SERVICE.GLOBAL.USER.MUT_LOGIN_STATE, true)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
