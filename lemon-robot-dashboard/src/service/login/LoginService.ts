import LoginForm from '@/model/login/LoginForm'
import axios from 'axios'
import LrUserAuthReq from '@/dto/LrUserAuthReq'
import StorageKeyDefineLogin from '@/define/storage/login'
import UrlDefineUser from '@/define/url/UrlDefineUser'
import $store from '@/store'
import NameUtil from '@/utils/NameUtil'
import StoreDefineLogin from '@/define/store/login/login'

export default class LoginService {
  static login (loginForm: LoginForm) {
    return new Promise((resolve, reject) => {
      axios.post(UrlDefineUser.LOGIN, new LrUserAuthReq(loginForm)).then((resp) => {
        if (resp.data.success) {
          if (loginForm.rememberPassword) {
            localStorage[StorageKeyDefineLogin.LOGIN_FORM_CACHE] = JSON.stringify(loginForm)
          }
          sessionStorage[StorageKeyDefineLogin.LOGIN_TOKEN] = resp.data.data
          axios.defaults.headers = {
            Authorization: 'Bearer ' + resp.data.data
          }
          this.setStoreLoginState(true)
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  private static setStoreLoginState (loginState: boolean) {
    $store.commit(NameUtil.CSCK(StoreDefineLogin.SET_LOGIN_STATE), loginState)
  }

  static logout () {
    sessionStorage.removeItem(StorageKeyDefineLogin.LOGIN_TOKEN)
    this.setStoreLoginState(false)
  }

  static getLoginState () {
    const loginToken = sessionStorage[StorageKeyDefineLogin.LOGIN_TOKEN]
    const loginState = loginToken !== undefined
    if (loginState) {
      axios.defaults.headers = {
        Authorization: 'Bearer ' + loginToken
      }
    }
    this.setStoreLoginState(loginState)
    return loginState
  }

  static getLoginFormCache (): LoginForm {
    const loginFormCacheStr = localStorage[StorageKeyDefineLogin.LOGIN_FORM_CACHE]
    if (loginFormCacheStr === undefined) {
      return new LoginForm()
    }
    return JSON.parse(loginFormCacheStr)
  }
}
