<template>
  <div class="dispatcher-item-alias-editor-impl">
    <el-tooltip class="item" effect="dark" :content="$t(lang + 'btn_set_alias_tip')" placement="top-end">
      <v-btn small color="secondary" fab dark @click="showEditorState = true">
        <v-icon>el-icon-edit-outline</v-icon>
      </v-btn>
    </el-tooltip>
    <v-dialog v-model="showEditorState" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{$t(lang + 'editor_dialog_title')}}</v-card-title>
        <div class="editor-center">
          <v-text-field :placeholder="$t(lang + 'alias_empty')" v-model="aliasData"></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat="flat" @click="showEditorState = false">{{$t(lang + 'cancel_btn_title')}}
          </v-btn>
          <v-btn color="primary" flat="flat">{{$t(lang + 'ok_btn_title')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import DispatcherOnline from '@/entity/DispatcherOnline'

  @Component
  export default class DispatcherItemAliasEditor extends Vue {
    lang = 'main.functions.dispatcher_manager.dispatcher_item.dispatcher_item_alias_editor.'
    showEditorState: boolean = false
    aliasData: string = ''
    @Prop({
      type: Object as () => DispatcherOnline
    })
    private readonly dispatcherInfo!: DispatcherOnline

    mounted () {
      this.aliasData = this.dispatcherInfo.relationDispatcherMachine.alias
    }
  }
</script>

<style scoped lang="scss">
  .editor-center {
    margin: 0 26px;
  }
</style>
