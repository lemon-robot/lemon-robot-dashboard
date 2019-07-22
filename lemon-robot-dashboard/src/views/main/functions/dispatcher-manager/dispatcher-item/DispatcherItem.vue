<template>
  <div class="dispatcher-item-impl need-show-os-icon">
    <i
      :class="'os-icon os-' + dispatcherInfo.relationDispatcherMachine.operateSystem +
             ' el-icon-' + dispatcherInfo.relationDispatcherMachine.operateSystem"></i>
    <div class="content-area">
      <div class="content-line">{{$t(lang + 'machine_sign') + dispatcherInfo.relationDispatcherMachine.machineSign}}
      </div>
      <div class="content-line">{{$t(lang + 'online_key') + dispatcherInfo.onlineKey}}</div>
      <div class="content-line">
        {{$t(lang + 'os') + dispatcherInfo.relationDispatcherMachine.operateSystem}}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{$t(lang + 'arch') + dispatcherInfo.relationDispatcherMachine.cpuArch}}
      </div>
      <div class="content-line">
        {{$t(lang + 'version') + dispatcherInfo.relationDispatcherMachine.dispatcherVersion}}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{$t(lang + 'ip') + dispatcherInfo.ipAddress}}
      </div>
      <div class="tag-container">
        <!--<el-button type="primary" icon="el-icon-collection" size="small" @click="dialog = true">{{$t(lang + 'edit_tags')}}</el-button>-->
        <dispatcher-item-tag-editor :dispatcher-info="dispatcherInfo"></dispatcher-item-tag-editor>
        <div class="tag-list">
          <el-tag :key="tag.tagKey" v-for="tag in dispatcherInfo.relationDispatcherMachine.tags">
            {{tag.tagName}}
          </el-tag>
          <div class="tip"
               v-if="dispatcherInfo.relationDispatcherMachine.tags === null || dispatcherInfo.relationDispatcherMachine.tags.length ===0">
            {{$t(lang + 'tags_empty_tip')}}
          </div>
        </div>
      </div>
    </div>
    <div class="os-water">
      {{dispatcherInfo.relationDispatcherMachine.operateSystem.toUpperCase()}}
      <div class="alias-name">{{dispatcherInfo.relationDispatcherMachine.alias === '' ?
        $t(lang + 'alias_not_set') : dispatcherInfo.relationDispatcherMachine.alias}}
      </div>
    </div>
    <div class="item-operator">
      <dispatcher-item-alias-editor :dispatcher-info="dispatcherInfo"></dispatcher-item-alias-editor>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import DispatcherOnline from '@/entity/DispatcherOnline'
  import DispatcherItemAliasEditor
    from '@/views/main/functions/dispatcher-manager/dispatcher-item/DispatcherItemAliasEditor.vue'
  import DispatcherItemTagEditor from '@/views/main/functions/dispatcher-manager/dispatcher-item/DispatcherItemTagEditor.vue'

  @Component({
    components: { DispatcherItemTagEditor, DispatcherItemAliasEditor },
    props: {
      dispatcherInfo: Object as () => DispatcherOnline
    }
  })
  export default class DispatcherItem extends Vue {
    lang = 'main.functions.dispatcher_manager.dispatcher_item.'
  }
</script>

<style scoped lang="scss">
  @import "@/assets/common-style/os.scss";

  .dispatcher-item-impl {
    $common-space: 14px;
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
      }
    }

    .item-operator {
      position: absolute;
      right: 0;
      bottom: 4px;
    }
  }
</style>
