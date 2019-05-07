<template>
  <div class="dispatcher-manager-impl">
    <server-node-list></server-node-list>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import ServerNodeList from './ServerNodeList.vue'

  @Component({
    components: {
      ServerNodeList
    }
  })
  export default class DispatcherManager extends Vue {
  }
</script>

<style scoped lang="scss">
</style>
