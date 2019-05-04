import $define from '@/define'

export default {
  state: {},
  getters: {
    [$define.SERVICE.GLOBAL.USER.GET_LOGIN_STATE] () {
      return sessionStorage[$define.SERVICE.GLOBAL.USER.STORAGE_KEY_CACHE_LOGIN_TOKEN] !== undefined
    },
    [$define.SERVICE.GLOBAL.USER.GET_LOGIN_TOKEN] () {
      return sessionStorage[$define.SERVICE.GLOBAL.USER.STORAGE_KEY_CACHE_LOGIN_TOKEN]
    }
  },
  mutations: {
    [$define.SERVICE.GLOBAL.USER.MUT_LOGIN_TOKEN] (state, token) {
      console.log(token)
      sessionStorage[$define.SERVICE.GLOBAL.USER.STORAGE_KEY_CACHE_LOGIN_TOKEN] = token
    },
    [$define.SERVICE.GLOBAL.USER.MUT_LOGOUT] () {
      sessionStorage.removeItem($define.SERVICE.GLOBAL.USER.STORAGE_KEY_CACHE_LOGIN_TOKEN)
    }
  },
  actions: {}
}
