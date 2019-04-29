<template>
  <div class="function-menu-impl">
    <template v-for="item in mainRouters.children">
      <div :key="item.name">{{item.name}}</div>
    </template>
  </div>
</template>

<script>
  import mainRouterDefine from '@/router/main'

  export default {
    name: 'FunctionMenu',
    data () {
      return {
        mainRouters: mainRouterDefine
      }
    },
    mounted () {
      console.log(this.$router.options.routes)
      console.log(mainRouterDefine.children)
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
