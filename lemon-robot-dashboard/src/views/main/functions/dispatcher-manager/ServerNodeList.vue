<template>
  <div class="server-node-list-impl" v-loading="listLoading">
    <div class="operator">
      <div class="operator-item" @click="list()"><i class="el-icon-refresh"></i></div>
    </div>
    <div class="list-container">
      <div class="server-node-item" v-for="serverNodeData in serverNodeList" :key="serverNodeData.nodeInfo.machineSign">
        <div class="left-area">
          <i :class="'os-icon el-icon-' + serverNodeData.nodeInfo.operateSystem"></i>
          <div class="left-bottom-area">
            <div :class="'active-indicator active-state-' + serverNodeData.activeState"></div>
            <div class="active-state-title">{{$t(lang + 'active_' + serverNodeData.activeState)}}</div>
          </div>
        </div>
        {{serverNodeData.nodeInfo.cpuArch}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import ServerNodeService from '@/service/server-node/ServerNodeService'
  import ServerNodeResp from '@/dto/server-node/ServerNodeResp'

  @Component
  export default class ServerNodeList extends Vue {
    lang = 'main.functions.dispatcher_manager.server_node_list.'
    serverNodeList: ServerNodeResp[] = []
    listLoading = false

    mounted () {
      this.list()
    }

    list () {
      this.listLoading = true
      ServerNodeService.list()
        .then((data: ServerNodeResp[]) => {
          this.listLoading = false
          this.serverNodeList = data
        })
        .catch(() => {
          this.listLoading = false
          console.log('errerrerrerr')
        })
    }
  }
</script>

<style scoped lang="scss">
  .server-node-list-impl {
    background: #f0f0f0;
    display: flex;
    flex-direction: row;
    min-height: 120px;
    border-bottom: 1px solid #cccccc;

    .operator {
      display: flex;
      flex-direction: column;
      width: 40px;
      border-right: 1px solid #cccccc;

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
      .server-node-item {
        display: flex;
        flex-direction: row;
        border: 1px solid #aaaaaa;
        padding: 10px;
        margin: 10px 0 10px 10px;

        .left-area {
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

            .active-state-title {
              color: #888888;
            }
          }
        }
      }
    }
  }
</style>
