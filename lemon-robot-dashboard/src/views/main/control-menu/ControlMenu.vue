<template>
  <div class="control-menu-impl">
    <user-menu></user-menu>
    <function-menu class="function-menu"></function-menu>
    <div class="info-area">LemonIT.CN</div>
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
    background: #444444;
    color: #eeeeee;
    display: flex;
    flex-direction: column;

    .function-menu {
      flex-grow: 1;
    }

    .info-area {
      font-size: 12px;
      margin: 10px 0;
      letter-spacing: 1.5px;
    }
  }
</style>
