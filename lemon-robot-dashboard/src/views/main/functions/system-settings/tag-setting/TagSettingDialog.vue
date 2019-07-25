<template>
  <div class="tag-setting-dialog">
    <el-dialog
        :title="$t(lang+'setting_dialog_title')"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="hideTagSettingDialog"
        :close-on-click-modal="false"
    >
      <table class="tag-setting-dialog-body" v-loading="loading">
        <thead>
        <el-row class="tag-create-item">
          <el-col :span="18">
            <!--<el-input class="tag-input" size="small" :placeholder="$t(lang+'create_tag_placeholder')"-->
            <!--v-model="newTagName"></el-input>-->
            <v-text-field
                :label="$t(lang+'create_tag_placeholder')"
                autofocus
                hide-details
                height="40px"
                v-model="newTagName"
            ></v-text-field>
          </el-col>
          <el-col :span="6">
            <v-btn color="info" small @click="createTag">{{$t(lang+'create_tag_title')}}</v-btn>
          </el-col>
        </el-row>
        </thead>
        <tbody class="tag-list">
        <tr class="tag-item" :key="tag.tagKey" v-for="(tag, $index) in allTags">
          <el-col :span="18">
            <v-text-field height="40px" hide-details single-line v-model="tag.tagName"
                          :disabled="tag.disabled"></v-text-field>
          </el-col>
          <el-col class="tag-item-tool" :span="6">
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
        </tr>
        </tbody>
      </table>
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
import TagSettingDialogItem from '@/model/system-settings/TagSettingDialogItem'

@Component
export default class TagsSettingDialog extends Vue {
  readonly lang: string = 'main.functions.system_settings.tag_setting.'
  dialogVisible: boolean = false
  allTags: TagSettingDialogItem[] = []
  newTagName: string = ''
  cacheTagsMap = new Map()
  loading: boolean = false
  tagChangeState: boolean = false

  get tagSettingDialogVisible(): boolean {
    return this.$store.getters[NameUtil.CSCK(StoreDefineTagSetting.GET_TAG_SETTING_DIALOG_VISIBLE)]
  }

  hideTagSettingDialog() {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_SETTING_DIALOG_VISIBLE), false)
    if (this.tagChangeState) {
      this.setTagChangeState(2)
    }
  }

  @Watch('tagSettingDialogVisible')
  onDialogStateChange(tagSettingDialogVisible: boolean) {
    this.dialogVisible = tagSettingDialogVisible
    if (tagSettingDialogVisible) {
      this.getTags()
    }
  }

  getTags() {
    this.allTags = []
    this.loading = true
    TagSettingService.GetTags()
      .then(resp => {
        for (let tag of resp) {
          this.allTags.push(new TagSettingDialogItem(tag))
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
          // this.setTagChangeState(true)
          this.tagChangeState = true
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
          // this.setTagChangeState(true)
          this.tagChangeState = true
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
          this.tagChangeState = true
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
  setTagChangeState(tagChangeState: number) {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_CHANGE_STATE), tagChangeState)
  }
}
</script>

<style lang="scss">
  .tag-setting-dialog {
    text-align: left;
    .tag-setting-dialog-body {
      width: 100%;
      .tag-create-item {
        margin: 5px 0;
        .v-text-field {
          padding-top: 0;
          margin-top: 0;
        }
      }
      .tag-list {
        height: 200px;
        overflow: auto;
        .tag-item {
          border-radius: 5px;
          &:nth-child(odd) {
            background-color: #f0f0f0;
          }
          .el-col {
            .v-text-field {
              padding-top: 0;
              padding-left: 6px;
              margin-top: 0;
              .v-input__slot {
                &:before {
                  border: none;
                }
              }
            }
          }
          .tag-item-tool{
            position: relative;
            right: -40px;
            transform: scale(0.4);
            opacity: 0;
            transition: all 0.2s ease-in-out;
          }
          &:hover{
            .tag-item-tool{
              right: 0;
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
