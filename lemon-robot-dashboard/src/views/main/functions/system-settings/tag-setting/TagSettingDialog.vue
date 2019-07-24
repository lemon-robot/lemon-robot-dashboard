<template>
  <div class="tag-setting-dialog">
    <el-dialog
        :title="$t(lang+'setting_dialog_title')"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="hideTagSettingDialog"
        :close-on-click-modal="false"
    >
      <div class="tag-list" v-loading="loading">
        <el-row class="tag-item">
          <el-col :span="18">
            <el-input class="tag-input" size="small" :placeholder="$t(lang+'create_tag_placeholder')"
                      v-model="newTagName"></el-input>
          </el-col>
          <el-col :span="6">
            <v-btn color="info" small @click="createTag">{{$t(lang+'create_tag_title')}}</v-btn>
          </el-col>
        </el-row>
        <el-row class="tag-item" :key="tag.tagKey" v-for="(tag, $index) in allTags">
          <el-col :span="18">
            <el-input class="tag-input" size="small" v-model="tag.tagName" :disabled="tag.disabled"></el-input>
          </el-col>
          <el-col :span="6">
            <v-btn v-if="tag.disabled" color="info" flat small icon @click="editTag(tag)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn v-else color="info" flat small icon @click="updateTag(tag)">
              <v-icon>check</v-icon>
            </v-btn>
            <v-btn color="error" flat small icon @click="deleteTag(tag.tagKey, $index)">
              <v-icon>delete</v-icon>
            </v-btn>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
    <!--<v-btn small @click="hideTagSettingDialog">{{$t(lang+'cancel_btn_title')}}</v-btn>-->
        <v-btn color="success" small @click="hideTagSettingDialog">{{$t(lang+'ok_btn_title')}}</v-btn>
    </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NameUtil from '@/utils/NameUtil'
import StoreDefineTagSetting from '@/define/store/main/functions/system-settings'
import {Watch} from 'vue-property-decorator'
import TagSettingService from '@/service/system-settings/TagSettingService'

@Component
export default class TagsSettingDialog extends Vue {
  readonly lang: string = 'main.functions.system_settings.tag_setting.'
  dialogVisible: boolean = false
  allTags: Array<any> = []
  newTagName: string = ''
  cacheTagsMap = new Map()
  loading: boolean = false

  // mounted() {
  //   this.setTagChangeState(false)
  // }

  get tagSettingDialogVisible(): boolean {
    return this.$store.getters[NameUtil.CSCK(StoreDefineTagSetting.GET_TAG_SETTING_DIALOG_VISIBLE)]
  }

  hideTagSettingDialog() {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_SETTING_DIALOG_VISIBLE), false)
  }

  @Watch('tagSettingDialogVisible')
  onDialogStateChange(tagSettingDialogVisible: boolean) {
    this.dialogVisible = tagSettingDialogVisible
    if (tagSettingDialogVisible) {
      this.getTags()
    }
  }

  getTags() {
    this.loading = true
    TagSettingService.GetTags()
      .then(resp => {
        this.allTags = (resp as any).data
        for (let tag of this.allTags) {
          this.$set(tag, 'disabled', true)
        }
        this.loading = false
        this.cacheTags()
      })
      .catch(err => {
        console.log(err)
      })
  }

  createTag() {
    if (this.tagNameIsEmpty(this.newTagName)) {
      this.validateFail()
      return false
    }
    this.loading = true
    TagSettingService.CreateTag(this.newTagName)
      .then(resp => {
        if (resp) {
          this.$notify.success({
            title: this.$t(this.lang + 'create_tag_title').toString(),
            message: this.$t(this.lang + 'create_tag_success_content').toString()
          })
          this.newTagName = ''
          this.setTagChangeState(true)
          this.getTags()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  editTag(tag: any) {
    tag.disabled = false
  }

  updateTag(tag: any) {
    if (this.tagNameIsEmpty(tag.tagName)) {
      this.validateFail()
      return false
    }
    this.loading = true
    tag.disabled = true
    TagSettingService.UpdateTag(tag.tagKey, tag.tagName)
      .then(resp => {
        if (resp) {
          this.$notify.success({
            title: this.$t(this.lang + 'update_tag_title').toString(),
            message: this.$t(this.lang + 'update_tag_success_content').toString()
          })
          this.cacheTags()
          this.setTagChangeState(true)
        } else {
          // 如果tag修改失败，页面数据回滚
          tag.tagName = this.cacheTagsMap.get(tag.tagKey)
        }
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteTag(tagKey: string, index: number) {
    this.loading = true
    TagSettingService.DeleteTag(tagKey)
      .then(resp => {
        if (resp) {
          this.$notify.success({
            title: this.$t(this.lang + 'delete_tag_title').toString(),
            message: this.$t(this.lang + 'delete_tag_success_content').toString()
          })
          this.allTags.splice(index, 1)
          this.setTagChangeState(true)
          this.cacheTags()
        }
        this.loading = false
      })
      .catch(err => {
        console.log(err)
      })
  }

  cacheTags() {
    this.cacheTagsMap.clear()
    for (let tag of this.allTags) {
      this.cacheTagsMap.set(tag.tagKey, tag.tagName)
    }
  }

  validateFail() {
    this.$notify.error({
      title: this.$t(this.lang + 'validate_fail_title').toString(),
      message: this.$t(this.lang + 'validate_fail_content').toString()
    })
  }

  tagNameIsEmpty(tagName: string) {
    return tagName === ''
  }

  tagNameNotChange(tag: any) {
    return tag.tagName === this.cacheTagsMap.get(tag.tagKey)
  }

  /**
   * Set tagChangeState
   * it is used in 'DispatcherItemTagEditor.vue'
   * if tagChangeState is true
   * when TagSettingDialog is closed
   * reload the tag list for view
   * @param {boolean} tagChangeState
   */
  setTagChangeState(tagChangeState: boolean) {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_CHANGE_STATE), tagChangeState)
  }
}
</script>

<style scoped lang="scss">
</style>
