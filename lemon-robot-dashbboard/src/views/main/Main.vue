<template>
  <div class="main-impl">
    <control-menu class="control-menu"></control-menu>
    <router-view class="router-content"/>
  </div>
</template>

<script>

  import ControlMenu from './control-menu/ControlMenu'

  export default {
    name: 'Login',
    components: { ControlMenu },
    mounted () {
      if (!this.$service.getters[this.$define.GLOBAL.USER.GET_LOGIN_STATE]) {
        this.$router.replace('/login')
        console.log(this.$t(this.lang + 'not_login_tip'))
      }
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
  }
</style>
