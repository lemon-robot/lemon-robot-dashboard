<template>
  <div class="user-info-panel-impl">
    <v-btn color="error" block>{{$t(lang + 'logout')}}</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'UserInfoPanel',
    data () {
      return {
        lang: 'main.control_menu.user_menu.user_info_panel.'
      }
    }
  }
</script>

<style scoped>
  .user-info-panel-impl {
    background: #f6f6f6;
  }
</style>
