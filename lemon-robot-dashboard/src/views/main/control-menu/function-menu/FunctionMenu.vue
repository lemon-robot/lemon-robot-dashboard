<template>
  <div class="function-menu-impl">
    function menu
  </div>
</template>

<script>
  export default {
    name: 'FunctionMenu',
    data () {
      return {
        functionList: [
          {
            name: 'dispatcher_manager',
            path: ''
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .function-menu-impl {
    border-top: 2px solid;
    border-bottom: 2px solid;
    border-image: -webkit-linear-gradient(to right, #444444 10%, #999, #444444 90%) 30 30;
    border-image: -moz-linear-gradient(to right, #444444 10%, #999, #444444 90%) 30 30;
    border-image: linear-gradient(to right, #444444 10%, #999, #444444 90%) 30 30;
  }
</style>
