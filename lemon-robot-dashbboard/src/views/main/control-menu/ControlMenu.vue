<template>
  <div class="control-menu-impl">
    <user-menu></user-menu>
    <function-menu></function-menu>
  </div>
</template>

<script>
  import FunctionMenu from './function-menu/FunctionMenu'
  import UserMenu from './user-menu/UserMenu'

  export default {
    name: 'ControlMenu',
    components: { UserMenu, FunctionMenu }
  }
</script>

<style scoped lang="scss">
  .control-menu-impl {
    background: #555555;
    color: #eeeeee;
  }
</style>
