export default {
  state: {},
  getters: {
    [window.$share.define.LOGIN.LOGIN_FORM.ACT_LOGIN] (context, info) {
      window.$share.service.commit(window.$share.define.GLOBAL.USER.MUT_LOGIN_STATE, true)
      return false
    }
  },
  mutations: {},
  actions: {}
}
