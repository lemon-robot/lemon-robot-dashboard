<template>
  <div class="tag-editor-container">
    <el-button type="primary" icon="el-icon-collection" :size="btnSize" @click="getTags">{{$t(lang + 'edit_tags')}}
    </el-button>
    <el-dialog
        class="tag-editor-dialog"
        :title="$t(lang+'editor_dialog_title')"
        :visible.sync="showEditorState"
        width="600px"
        :close-on-click-modal="false"
    >
      <el-transfer
          v-model="selectedTagKeys"
          :data="allTags"
          :titles="[$t(lang+'transfer_left_title'), $t(lang+'transfer_right_title')]"
          @change="handelChange"
          v-loading="loading"
      ></el-transfer>
      <span slot="footer" class="tag-editor-dialog-footer">
        <el-button class="manage-btn" type="primary" icon="el-icon-edit" :size="btnSize" :loading="loading"
                   @click="showTagSettingDialog">{{$t(lang + 'manage_btn_title')}}</el-button>
        <el-button :size="btnSize" :loading="loading"
                   @click="showEditorState = false">{{$t(lang + 'cancel_btn_title')}}</el-button>
        <el-button type="primary" :size="btnSize" :disabled="okBtnIsDisabled" :loading="loading" @click="setTags">{{$t(lang + 'ok_btn_title')}}</el-button>
      </span>
    </el-dialog>
    <tag-setting-dialog></tag-setting-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop, Watch} from 'vue-property-decorator'
import DispatcherOnline from '@/entity/DispatcherOnline'
import DispatcherTag from '@/entity/DispatcherTag'
import TagSettingService from '@/service/system-settings/TagSettingService'
import DispatcherMachineService from '@/service/dispatcher/DispatcherMachineService'
import DispatcherTransferItem from '@/model/dispatcher/DispatcherTransferItem'
import TagSettingDialog from '@/views/main/functions/system-settings/tag-setting/TagSettingDialog.vue'
import NameUtil from '@/utils/NameUtil'
import StoreDefineTagSetting from '@/define/store/main/functions/system-settings'

@Component({
  components: {TagSettingDialog}
})
export default class DispatchItemTagEditor extends Vue {
  readonly lang: string = 'main.functions.dispatcher_manager.dispatcher_item.dispatcher_item_tag_editor.'
  readonly btnSize: string = 'small'
  loading: boolean = true
  showEditorState: boolean = false
  okBtnIsDisabled: boolean = true
  selectedTagKeys: Array<any> = []
  allTags: Array<any> = []
  cacheTagKeys: Array<any> = []
  tagMap = new Map()
  @Prop()
  private dispatcherInfo!: DispatcherOnline

  async getTags() {
    this.showEditorState = true
    this.loading = true
    this.okBtnIsDisabled = true
    await TagSettingService.GetTags()
      .then(resp => {
        this.formDataTags((resp as any).data)
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }

  setTags() {
    this.loading = true
    const newTags = this.getNewTagsForView()
    const machineSign = this.dispatcherInfo.relationDispatcherMachine.machineSign
    const tagKeys = this.selectedTagKeys
    DispatcherMachineService.SetTags(machineSign, tagKeys)
      .then(resp => {
        if (resp) {
          this.$notify.success({
            title: this.$t(this.lang + 'set_tags_success_title').toString(),
            message: this.$t(this.lang + 'set_tags_success_content').toString()
          })
          this.dispatcherInfo.relationDispatcherMachine.tags = newTags
          this.loading = false
          this.showEditorState = false
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handelChange() {
    this.okBtnIsDisabled = this.selectedTagsIsNotChanged()
  }

  /**
   * when transfer onchange
   * get new tags for dispatcher machine
   * @returns {any[]}
   */
  private getNewTagsForView() {
    let newTags = []
    if (this.selectedTagKeys.length > 0) {
      for (let tagKey of this.selectedTagKeys) {
        newTags.push(this.tagMap.get(tagKey))
      }
    }
    console.log(newTags)
    return newTags
  }

  /**
   * formData tags for transfer ':data' attribute
   * [{ key: string, label: string, disabled: boolean }]
   * formData selectedTagKeys for transfer 'v-model' attribute
   * set tag map {tagKey: tag}
   * cache selectedTagKeys
   * @param {[]} tags
   */
  private formDataTags(tags: DispatcherTag[]) {
    // all tags
    this.allTags = []
    this.tagMap.clear()
    for (let tag of tags) {
      this.tagMap.set(tag.tagKey, tag)
      this.allTags.push(new DispatcherTransferItem(tag.tagKey, tag.tagName, false))
    }
    // selected tags
    const currentTags = this.dispatcherInfo.relationDispatcherMachine.tags || []
    this.selectedTagKeys = []
    for (let tag of currentTags) {
      this.selectedTagKeys.push(tag.tagKey)
      this.cacheTagKeys = this.selectedTagKeys
    }
  }

  private selectedTagsIsNotChanged() {
    return this.cacheTagKeys.sort().toString() === this.selectedTagKeys.sort().toString()
  }

  showTagSettingDialog() {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_SETTING_DIALOG_VISIBLE), true)
  }

  get tagChangeState() {
    return this.$store.getters[NameUtil.CSCK(StoreDefineTagSetting.GET_TAG_CHANGE_STATE)]
  }

  @Watch('tagChangeState')
  onTagChangeState(tagChangeState: boolean) {
    if (tagChangeState) {
      this.getTags() // reload tags
        .then(() => {
          this.dispatcherInfo.relationDispatcherMachine.tags = this.getNewTagsForView() // reload dispatcher machine tags
        })
      this.setTagChangeStateDefault() // set tagChangeState false
    }
  }

  setTagChangeStateDefault() {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_CHANGE_STATE), false)
  }
}
</script>

<style scoped lang="scss">
  .tag-editor-container {
    .tag-editor-dialog {
      .tag-editor-dialog-footer {
        width: 100%;

        .manage-btn {
          float: left;
        }
      }
    }
  }
</style>
