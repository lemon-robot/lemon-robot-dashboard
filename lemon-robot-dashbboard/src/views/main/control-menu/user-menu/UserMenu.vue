<template>
  <div class="user-menu-impl">
    <img src="@/assets/images/logo.png" class="avatar">
    <div class="login">
      {{$t(lang + 'login')}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserMenu',
    mounted () {
      console.log('LOGIN STATE: ' + this.$store.getters[this.$define.MAIN.CONTROL_MENU.USER_MENU.GET_LOGIN_STATE])
    },
    data () {
      return {
        lang: 'main.control_menu.user_menu.'
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-menu-impl {
    .avatar {
      width: 90px;
      height: 90px;
    }
  }
</style>
