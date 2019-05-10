<template>
  <div class="server-node-list-impl" v-loading="listLoading">
    <div class="operator">
      <div class="operator-item" @click="list()"><i class="el-icon-refresh"></i></div>
    </div>
    <div class="list-container">
      <div
        :class="'server-node-item ' + (serverNodeData.nodeInfo.machineSign === selectedServerNodeMachineSign ? 'selected-item' : '')"
        v-for="serverNodeData in serverNodeList"
        @click="selectServerNode(serverNodeData.nodeInfo.machineSign)"
        :key="serverNodeData.nodeInfo.machineSign">
        <div class="left-area">
          <i :class="'os-icon el-icon-' + serverNodeData.nodeInfo.operateSystem"></i>
          <div class="left-bottom-area">
            <div :class="'active-indicator active-state-' + serverNodeData.activeState"></div>
            <div class="active-state-title">{{$t(lang + 'active_' + serverNodeData.activeState)}}</div>
          </div>
        </div>
        <div class="right-area">
          <div class="right-line">{{$t(lang + 'machine_sign') + serverNodeData.nodeInfo.machineSign}}</div>
          <div class="right-line">{{$t(lang + 'arch') + serverNodeData.nodeInfo.cpuArch}}</div>
          <div class="right-line">{{$t(lang + 'os') + serverNodeData.nodeInfo.operateSystem}}</div>
          <div class="right-line">{{$t(lang + 'version') + serverNodeData.nodeInfo.serverVersion}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import ServerNodeService from '@/service/server-node/ServerNodeService'
  import ServerNodeResp from '@/dto/server-node/ServerNodeResp'
  import NameUtil from '@/utils/NameUtil'
  import StoreDefineDispatcherManager from '@/define/store/main/functions/dispatcher-manager'

  @Component
  export default class ServerNodeList extends Vue {
    lang = 'main.functions.dispatcher_manager.server_node_list.'
    serverNodeList: ServerNodeResp[] = []
    listLoading = false

    mounted () {
      this.list()
    }

    selectServerNode (nodeMachineSign: string) {
      this.$store.commit(
        NameUtil.CSCK(StoreDefineDispatcherManager.SET_SELECTED_SERVER_NODE_MACHINE_SIGN),
        nodeMachineSign
      )
    }

    list () {
      this.listLoading = true
      ServerNodeService.list()
        .then((data: ServerNodeResp[]) => {
          this.listLoading = false
          this.serverNodeList = data
          if (data.length > 0) {
            this.selectServerNode(data[0].nodeInfo.machineSign)
          }
        })
        .catch(() => {
          this.listLoading = false
        })
    }

    get selectedServerNodeMachineSign (): string {
      return this.$store.getters[NameUtil.CSCK(StoreDefineDispatcherManager.GET_SELECTED_SERVER_NODE_MACHINE_SIGN)]
    }
  }
</script>

<style scoped lang="scss">
  .server-node-list-impl {
    --common-border-line-color: #cccccc;
    background: #f0f0f0;
    display: flex;
    flex-direction: row;
    min-height: 120px;
    border-bottom: 1px solid var(--common-border-line-color);

    .operator {
      display: flex;
      flex-direction: column;
      width: 40px;
      border-right: 1px solid var(--common-border-line-color);

      .operator-item {
        font-size: 26px;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        cursor: pointer;
      }
    }

    .list-container {
      display: flex;
      flex-direction: row;
      overflow: scroll;

      .server-node-item {
        --common-space: 15px;
        display: flex;
        flex-direction: row;
        border: 1px solid var(--common-border-line-color);
        padding: var(--common-space);
        margin: var(--common-space) 0 var(--common-space) var(--common-space);
        cursor: pointer;
        min-width: 480px;

        .left-area {
          padding-right: var(--common-space);
          border-right: 1px solid var(--common-border-line-color);

          .os-icon {
            font-size: 60px;
          }

          .left-bottom-area {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 6px;

            .active-indicator {
              width: 12px;
              height: 12px;
              border-radius: 6px;
              margin-right: 4px;
            }

            .active-state-true {
              background: #2fc14f;
            }

            .active-state-false {
              background: #aaaaaa;
            }

            .active-state-title {
              color: #888888;
            }
          }
        }

        .right-area {
          display: flex;
          flex-direction: column;
          padding-left: var(--common-space);

          .right-line {
            text-align: left;
          }
        }
      }

      .selected-item {
        box-shadow: inset 0 0 8px #aaaaaa;
        border: 1px solid #aaaaaa;
      }
    }
  }
</style>
