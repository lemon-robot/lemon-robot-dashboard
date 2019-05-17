<template>
  <div class="dispatcher-list-impl" v-loading="serverNodeDataRefreshState">
    <div class="dispatcher-list-container"
         v-if="selectedServerNodeInfo.activeState && selectedServerNodeInfo.nodeInfo.onlineDispatchers.length > 0">
      <div class="dispatcher-item need-show-os-icon" v-for="item in selectedServerNodeInfo.nodeInfo.onlineDispatchers"
           :key="item.onlineKey">
        <i
          :class="'os-icon os-' + item.relationDispatcherMachine.operateSystem +
             ' el-icon-' + item.relationDispatcherMachine.operateSystem +
              (item.relationDispatcherMachine.operateSystem === 'linux' ? '-online' : '')"></i>
        <div class="content-area">
          <div class="content-line">{{$t(lang + 'machine_sign') + item.relationDispatcherMachine.machineSign}}</div>
          <div class="content-line">{{$t(lang + 'online_key') + item.onlineKey}}</div>
          <div class="content-line">
            {{$t(lang + 'os') + item.relationDispatcherMachine.operateSystem}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{$t(lang + 'arch') + item.relationDispatcherMachine.cpuArch}}
          </div>
          <div class="content-line">
            {{$t(lang + 'version') + item.relationDispatcherMachine.dispatcherVersion}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{$t(lang + 'ip') + item.ipAddress}}
          </div>
          <div class="tag-container">
            <el-button type="primary" icon="el-icon-collection" size="small">{{$t(lang + 'edit_tags')}}</el-button>
            <div class="tag-list">
              <el-tag :key="tag.tagKey" v-for="tag in item.relationDispatcherMachine.tags">
                {{tag.tagName}}
              </el-tag>
              <div class="tip"
                   v-if="item.relationDispatcherMachine.tags === null || item.relationDispatcherMachine.tags.length ===0">
                {{$t(lang + 'tags_empty_tip')}}
              </div>
            </div>
          </div>
        </div>
        <div class="os-water">
          {{item.relationDispatcherMachine.operateSystem.toUpperCase()}}
          <!--          <div class="alias-name">{{item.relationDispatcherMachine.alias === '' ?-->
          <!--            $t(lang + 'alias_not_set') : item.relationDispatcherMachine.alias}}-->
          <!--          </div>-->
          <v-text-field class="alias-name"
                        :placeholder="$t(lang + 'alias_not_set')"
                        v-model="aliasPool[item.relationDispatcherMachine.machineSign]"></v-text-field>
        </div>
        <div class="item-operator">
          <el-tooltip class="item" effect="dark" :content="$t(lang + 'btn_set_alias_tip')" placement="top-end">
            <v-btn small color="secondary" fab dark>
              <v-icon>el-icon-edit-outline</v-icon>
            </v-btn>
          </el-tooltip>
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
  import DispatcherOnline from '@/entity/DispatcherOnline'

  @Component
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
  @import "@/assets/common-style/os.scss";

  .dispatcher-list-impl {

    .dispatcher-list-container {
      $common-space: 14px;

      .dispatcher-item {
        margin: $common-space $common-space * 1.5 0 $common-space * 1.5;
        border: 1px solid #cccccc;
        text-align: left;
        position: relative;
        overflow: hidden;
        height: 168px;
        border-top: 4px solid var(--primary);

        .os-icon {
          position: absolute;
          bottom: -16px;
          left: -14px;
          font-size: 120px;
          opacity: 0.3;
        }

        .content-area {
          margin-left: 140px;
          position: relative;

          .content-line {
            margin: 3px 0 0 0;
            font-size: 16px;
            color: #222222;
          }

          .content-line:first-child {
            margin-top: 10px;
          }

          .tag-container {
            margin-right: 100px;
            display: flex;
            flex-direction: row;
            margin-top: 8px;

            .tag-list {
              margin-left: 20px;
              display: flex;
              flex-direction: row;
              align-items: center;

              * {
                margin-right: 10px;
              }
            }
          }
        }

        .os-water {
          position: absolute;
          right: 0;
          top: -10px;
          opacity: 0.1;
          font-size: 60px;

          .alias-name {
            font-size: 24px;
            text-align: right;
            font-weight: bold;
            margin-right: 10px;
            margin-top: -16px;

            * {
              text-align: right;
            }
          }

          .alias-name input {
            text-align: right;
          }
        }

        .item-operator {
          position: absolute;
          right: 0;
          bottom: 4px;
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
