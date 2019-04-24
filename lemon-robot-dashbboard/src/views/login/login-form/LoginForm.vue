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
        :counter="10"
        :label="$t(lang + 'number')"
        required></v-text-field>
      <v-text-field
        :label="$t(lang + 'password')"
        required
      ></v-text-field>
      <v-btn
        block
        color="success"
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
        lang: 'login.login_form.'
      }
    },
    methods: {
      login () {
        this.$service.dispatch(this.$define.SERVICE.LOGIN.LOGIN_FORM.ACT_LOGIN, {
          number: 'liuri'
        }).then((info) => {
          console.log('login wjshile' + info)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-form-impl {
    border: 1px #ddd solid;

    .form-header {
      font-size: 16px;
      line-height: 46px;
      border-bottom: 2px solid;
      border-image: -webkit-linear-gradient(to right, #fff 10%, #aaa, #fff 90%) 30 30;
      border-image: -moz-linear-gradient(to right, #fff 10%, #aaa, #fff 90%) 30 30;
      border-image: linear-gradient(to right, #fff 10%, #aaa, #fff 90%) 30 30;
    }

    .form-body {
      margin: 0 30px;
    }
  }
</style>
