<template>
  <div class="main-impl">
    <control-menu class="control-menu"></control-menu>
    <router-view class="router-main-content"/>
  </div>
</template>

<script>

  import ControlMenu from './control-menu/ControlMenu'

  export default {
    name: 'Login',
    components: { ControlMenu },
    created () {
      if (!this.$service.getters[this.$define.SERVICE.GLOBAL.USER.GET_LOGIN_STATE]) {
        this.$notify({
          title: this.$t(this.lang + 'not_login_tip_title'),
          message: this.$t(this.lang + 'not_login_tip_message'),
          type: 'warning'
        })
        this.$router.replace('/login')
      }
    },
    mounted () {
    },
    data () {
      return {
        lang: 'main.'
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-impl {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    .control-menu {
      min-width: 300px;
      width: 300px;
      overflow: scroll;
    }

    .router-main-content {
      flex-grow: 1;
    }
  }
</style>
