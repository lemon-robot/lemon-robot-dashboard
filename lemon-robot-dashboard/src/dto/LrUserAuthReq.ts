import LoginForm from '@/model/login/LoginForm'

export default class LrUserAuthReq {
  number: string = '';
  password: string = '';

  constructor (loginForm: LoginForm) {
    this.number = loginForm.number
    this.password = loginForm.password
  }
}
