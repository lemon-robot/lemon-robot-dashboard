<template>
  <div class="user-menu-impl">
    <el-popover
      placement="right"
      width="320"
      trigger="hover">
      <user-info-panel></user-info-panel>
      <div class="" slot="reference">
        <img src="@/assets/images/logo.png" class="avatar">
        <div class="username">
          {{'LemonIT.CN'}}
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
  import UserInfoPanel from './UserInfoPanel'

  export default {
    name: 'UserMenu',
    components: { UserInfoPanel },
    mounted () {
      console.log('LOGIN STATE: ' + this.$store.getters[this.$define.SERVICE.GLOBAL.USER.GET_LOGIN_STATE])
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
    margin: 24px 0 18px 0;
    cursor: pointer;

    .username {
      font-size: 20px;
      margin-top: 8px;
    }

    .avatar {
      width: 90px;
      height: 90px;
    }
  }
</style>
