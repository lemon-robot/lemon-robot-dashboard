<template>
  <div class="dispatcher-list-impl" v-loading="serverNodeDataRefreshState">
    <div class="dispatcher-list-container"
         v-if="selectedServerNodeInfo.activeState && selectedServerNodeInfo.nodeInfo.onlineDispatchers.length > 0">
      <dispatcher-item v-for="item in selectedServerNodeInfo.nodeInfo.onlineDispatchers"
                       :key="item.onlineKey" :dispatcher-info="item"></dispatcher-item>
    </div>
    <div class="server-node-offline tip-title" v-if="!selectedServerNodeInfo.activeState">
      <i class="tip-icon el-icon-offline"></i>
      {{$t(lang + 'server_node_offline')}}
    </div>
    <div class="all-dispatcher-offline tip-title"
         v-if="selectedServerNodeInfo.activeState && selectedServerNodeInfo.nodeInfo.onlineDispatchers.length === 0">
      <i class="tip-icon el-icon-empty"></i>
      {{$t(lang + 'all_dispatcher_offline')}}
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import NameUtil from '@/utils/NameUtil'
  import { Watch } from 'vue-property-decorator'
  import StoreDefineDispatcherManager from '@/define/store/main/functions/dispatcher-manager'
  import ServerNodeResp from '@/dto/ServerNodeResp'
  import DispatcherOnline from '@/entity/DispatcherOnline'
  import DispatcherItem from '@/views/main/functions/dispatcher-manager/dispatcher-item/DispatcherItem.vue'

  @Component({
    components: {
      DispatcherItem
    }
  })
  export default class DispatcherList extends Vue {
    lang = 'main.functions.dispatcher_manager.dispatcher_list.'
    aliasPool: any = {}

    get selectedServerNodeInfo (): ServerNodeResp {
      return this.$store.getters[NameUtil.CSCK(StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_INFO)]
    }

    get serverNodeDataRefreshState (): boolean {
      return this.$store.getters[NameUtil.CSCK(StoreDefineDispatcherManager.GET_REFRESH_SERVER_NODE_STATE)]
    }

    @Watch('selectedServerNodeInfo')
    onSelectedServerNodeChanged (selectedServerNodeResp: ServerNodeResp) {
      selectedServerNodeResp.nodeInfo.onlineDispatchers.forEach((dispatcher: DispatcherOnline, index: number) => {
        this.aliasPool[dispatcher.relationDispatcherMachine.machineSign] = dispatcher.relationDispatcherMachine.alias
      })
      console.log(this.aliasPool)
    }
  }
</script>

<style scoped lang="scss">

  .dispatcher-list-impl {

    .tip-title {
      margin-top: 200px;
      font-size: 20px;
      color: #cccccc;

      .tip-icon {
        font-size: 60px;
        display: block;
        margin-bottom: 20px;
      }
    }

  }
</style>
