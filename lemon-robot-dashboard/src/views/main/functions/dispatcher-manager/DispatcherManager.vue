<template>
  <div class="dispatcher-manager-impl">
    <server-node-list class="server-node-list"></server-node-list>
    <dispatcher-list class="dispatcher-list"></dispatcher-list>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import ServerNodeList from './ServerNodeList.vue'
  import DispatcherList from './DispatcherList.vue'

  @Component({
    components: {
      ServerNodeList, DispatcherList
    }
  })
  export default class DispatcherManager extends Vue {
  }
</script>

<style scoped lang="scss">
  .dispatcher-manager-impl {
    display: flex;
    flex-direction: column;
    align-content: stretch;

    .server-node-list {
      height: 150px;
    }

    .dispatcher-list {
      flex-grow: 1;
    }
  }
</style>
