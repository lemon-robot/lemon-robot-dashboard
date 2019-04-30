<template>
  <div class="function-menu-impl">
    <div v-for="item in mainRouters.children" class="function-menu-item" :key="item.name">
      <i :class="'item-icon el-icon-' + item.name"></i>
      <div>{{$t('functions.' + item.name)}}</div>
    </div>
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
    display: flex;
    flex-wrap: wrap;
  }

  .function-menu-item {
    width: 46%;
    height: 100px;
    border: 1px solid #eeeeee;
    cursor: pointer;
    margin-left: 3%;
    margin-top: 6px;

    .item-icon {
      font-size: 40px;
    }
  }
</style>
