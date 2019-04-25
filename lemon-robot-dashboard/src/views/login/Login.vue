<template>
  <div class="login-impl">
    <login-header></login-header>
    <div class="center-area">
      <company-info class="company-info"></company-info>
      <login-form class="login-form"></login-form>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
  import LoginHeader from './login-header/LoginHeader'
  import LoginFooter from './login-footer/LoginFooter'
  import CompanyInfo from './company-info/CompanyInfo'
  import LoginForm from './login-form/LoginForm'

  export default {
    name: 'Login',
    components: { LoginForm, CompanyInfo, LoginFooter, LoginHeader }
  }
</script>

<style scoped lang="scss">
  .login-impl {
    display: flex;
    flex-direction: column;

    .center-area {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .company-info {
      margin-right: 30px;
    }

    .login-form {
      width: 360px;
    }
  }
</style>
