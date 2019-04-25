import $define from '@/define'

export default {
  state: {
    loginState: false
  },
  getters: {
    [$define.SERVICE.GLOBAL.USER.GET_LOGIN_STATE] (state) {
      return state.loginState
    }
  },
  mutations: {
    [$define.SERVICE.GLOBAL.USER.MUT_LOGIN_STATE] (state, loginState) {
      state.loginState = loginState
    }
  },
  actions: {}
}
