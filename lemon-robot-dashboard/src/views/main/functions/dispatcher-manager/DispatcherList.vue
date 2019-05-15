<template>
  <div class="dispatcher-list-impl">
    <div class="dispatcher-list-container"
         v-if="selectedServerNodeInfo.activeState && selectedServerNodeInfo.nodeInfo.onlineDispatchers.length > 0">
      <div class="dispatcher-item need-show-os-icon" v-for="item in selectedServerNodeInfo.nodeInfo.onlineDispatchers"
           :key="item.onlineKey">
        <i
          :class="'os-icon os-' + item.relationDispatcherMachine.operateSystem +
             ' el-icon-' + item.relationDispatcherMachine.operateSystem +
              (item.relationDispatcherMachine.operateSystem === 'linux' ? '-online' : '')"></i>
        <div class="content-area">
          <div class="content-line">{{$t(lang + 'os') + item.relationDispatcherMachine.operateSystem}}</div>
          <div class="content-line">{{$t(lang + 'machine_sign') + item.relationDispatcherMachine.machineSign}}</div>
          <div class="content-line">{{$t(lang + 'arch') + item.relationDispatcherMachine.cpuArch}}</div>
          <div class="content-line">{{$t(lang + 'version') + item.relationDispatcherMachine.dispatcherVersion}}</div>
          <div class="content-line">{{$t(lang + 'ip') + item.ipAddress}}</div>
          <div class="os-water">
            {{item.relationDispatcherMachine.operateSystem.toUpperCase()}}
            <div class="alias-name">{{item.relationDispatcherMachine.alias === '' ?
              $t(lang + 'alias_not_set') : item.relationDispatcherMachine.alias}}
            </div>
          </div>
        </div>
      </div>
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
  import ServerNodeResp from '@/dto/server-node/ServerNodeResp'

  @Component
  export default class DispatcherList extends Vue {
    lang = 'main.functions.dispatcher_manager.dispatcher_list.'

    get selectedServerNodeInfo (): ServerNodeResp {
      return this.$store.getters[NameUtil.CSCK(StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_INFO)]
    }

    @Watch('selectedServerNodeInfo')
    onSelectedServerNodeChanged (selectedServerNode: ServerNodeResp) {
      console.log('liuri  === ' + selectedServerNode.nodeInfo.machineSign)
    }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/common-style/os.scss";

  .dispatcher-list-impl {

    .dispatcher-list-container {
      --common-space: 10px;

      .dispatcher-item {
        margin: var(--common-space) var(--common-space) 0 var(--common-space);
        border: 1px solid #cccccc;
        text-align: left;
        position: relative;
        overflow: hidden;

        .os-icon {
          position: absolute;
          bottom: -10px;
          left: -8px;
          font-size: 105px;
          opacity: 0.4;
        }

        .content-area {
          margin-left: 110px;
          position: relative;

          .content-line {
            margin: 6px 0 0 0;
            font-size: 16px;
            color: #222222;
          }

          .content-line:last-child {
            margin-bottom: 10px;
          }

          .os-water {
            position: absolute;
            right: 0;
            top: -20px;
            opacity: 0.1;
            font-size: 60px;

            .alias-name {
              font-size: 20px;
              text-align: right;
              font-weight: bold;
              margin-right: 10px;
              margin-top: -14px;
            }
          }
        }

      }
    }

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
