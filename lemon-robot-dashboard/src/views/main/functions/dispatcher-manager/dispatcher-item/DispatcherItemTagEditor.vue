<template>
  <div class="tag-editor-container">
    <el-button type="primary" icon="el-icon-collection" :size="btnSize" @click="init">{{$t(lang + 'edit_tags')}}
    </el-button>
    <el-dialog
        class="tag-editor-dialog"
        :title="$t(lang+'editor_dialog_title')"
        :visible.sync="showEditorState"
        width="600px"
        :close-on-click-modal="false"
        :before-close="hideTagEditorDialog"
    >
      <el-transfer
          v-model="selectedTagKeys"
          :data="allTags"
          :titles="[$t(lang+'transfer_left_title'), $t(lang+'transfer_right_title')]"
          @change="handelChange"
          v-loading="loading"
      ></el-transfer>
      <span slot="footer" class="tag-editor-dialog-footer">
        <v-btn class="manage-btn ma-2 tile" outlined color="success" :loading="loading" small @click="showTagSettingDialog">
           {{$t(lang+'manage_btn_title')}}
        </v-btn>
        <v-btn small :loading="loading" @click="hideTagEditorDialog">{{$t(lang+'cancel_btn_title')}}</v-btn>
        <v-btn color="info" small :loading="loading" :disabled="okBtnIsDisabled" @click="setTags">{{$t(lang+'ok_btn_title')}}</v-btn>
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
  selectedTagKeys: string[] = []
  allTags: DispatcherTransferItem[] = []
  cacheTagKeys: string[] = []
  tagMap = new Map()
  @Prop()
  private dispatcherInfo!: DispatcherOnline

  init() {
    this.getTags()
    this.formDataSelectedTags()
  }

  getTags() {
    this.showEditorState = true
    this.loading = true
    TagSettingService.GetTags()
      .then((resp: DispatcherTag[]) => {
        this.formDataAllTags(resp)
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }

  setTags() {
    this.loading = true
    const newTags = this.getNewTagsForView(this.selectedTagKeys)
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
          this.okBtnIsDisabled = true
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
  private getNewTagsForView(tagKeys: string[]) {
    let newTags = []
    if (tagKeys.length > 0) {
      for (let tagKey of tagKeys) {
        if (!this.tagMap.has(tagKey)) continue
        newTags.push(this.tagMap.get(tagKey))
      }
    }
    return newTags
  }

  /**
   * formData tags for transfer ':data' attribute
   * [{ key: string, label: string, disabled: boolean }]
   * formData selectedTagKeys for transfer 'v-model' attribute
   * @param {[]} tags
   */
  private formDataAllTags(tags: DispatcherTag[]) {
    // all tags
    this.allTags = []
    this.tagMap.clear()
    for (let tag of tags) {
      this.tagMap.set(tag.tagKey, tag)
      this.allTags.push(new DispatcherTransferItem(tag.tagKey, tag.tagName, false))
    }
  }

  private formDataSelectedTags() {
    // selected tags
    const currentTags = this.dispatcherInfo.relationDispatcherMachine.tags || []
    this.selectedTagKeys = []
    for (let tag of currentTags) {
      this.selectedTagKeys.push(tag.tagKey)
    }
    this.cacheTagKeys = this.selectedTagKeys
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
  onTagChangeState(tagChangeState: number) {
    if (tagChangeState === 2) {
      this.getTags() // reload tags
      this.setTagChangeState(1) // set tagChangeState false
    }
  }

  setTagChangeState(tagChangeState: number) {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_CHANGE_STATE), tagChangeState)
  }

  hideTagEditorDialog() {
    this.showEditorState = false
    const tagChangeState = this.$store.getters[NameUtil.CSCK(StoreDefineTagSetting.GET_TAG_CHANGE_STATE)]
    console.log(tagChangeState, this.getNewTagsForView(this.cacheTagKeys))
    if (tagChangeState === 1) {
      this.dispatcherInfo.relationDispatcherMachine.tags = this.getNewTagsForView(this.cacheTagKeys) // reload dispatcher machine tags
      this.setTagChangeState(0)
    }
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
