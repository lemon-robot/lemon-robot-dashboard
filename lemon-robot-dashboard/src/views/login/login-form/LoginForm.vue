<template>
  <div class="login-form-impl">
    <div class="form-header">
      {{$t(lang + 'header_title')}}
    </div>
    <v-form
        ref="form"
        lazy-validation
        class="form-body">
      <v-text-field
          :label="$t(lang + 'number')"
          v-model="loginForm.number"
          required></v-text-field>
      <v-text-field
          :label="$t(lang + 'password')"
          v-model="loginForm.password"
          type="password"
          required></v-text-field>
      <v-switch v-model="loginForm.rememberPassword" color="primary" :label="$t(lang + 'remember_password')"></v-switch>
      <v-btn
          block
          color="primary"
          @click="login">
        {{$t(lang + 'login')}}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'LoginForm',
    mounted () {
    },
    data () {
      return {
        lang: 'login.login_form.',
        loginForm: this.$service.getters[this.$define.SERVICE.LOGIN.LOGIN_FORM.GET_CACHE_LOGIN_FORM]
      }
    },
    methods: {
      login () {
        this.$service.dispatch(this.$define.SERVICE.LOGIN.LOGIN_FORM.ACT_LOGIN, this.loginForm).then((info) => {
          this.$router.replace('/')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-form-impl {
    border: 1px #dddddd solid;
    border-top: 4px var(--primary) solid;

    .form-header {
      font-size: 16px;
      line-height: 46px;
      border-bottom: 2px solid;
      border-image: -webkit-linear-gradient(to right, #fff 10%, var(--accent), #fff 90%) 30 30;
      border-image: -moz-linear-gradient(to right, #fff 10%, var(--accent), #fff 90%) 30 30;
      border-image: linear-gradient(to right, #fff 10%, var(--accent), #fff 90%) 30 30;
      background: #f6f6f6;
    }

    .form-body {
      margin: 14px 30px 24px 30px;
    }
  }
</style>
