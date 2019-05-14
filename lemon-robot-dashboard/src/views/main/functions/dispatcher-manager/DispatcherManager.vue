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
  import { Watch } from 'vue-property-decorator'
  import NameUtil from '@/utils/NameUtil'
  import StoreDefineDispatcherManager from '@/define/store/main/functions/dispatcher-manager'

  @Component({
    components: {
      ServerNodeList, DispatcherList
    }
  })
  export default class DispatcherManager extends Vue {
    get selectedServerNodeMachineSign (): string {
      return this.$store.getters[NameUtil.CSCK(StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_MACHINE_SIGN)]
    }

    @Watch('selectedServerNodeMachineSign')
    onSelectedServerNodeChanged (selectedServerNodeMachineSign: string) {
      console.log('ss  === ' + selectedServerNodeMachineSign)
    }
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
