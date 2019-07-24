<template>
  <div>
    <el-button type="primary" @click="showTagsSettingDialog">manage</el-button>
    <tags-setting-dialog></tags-setting-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TagsSettingDialog from '@/views/main/functions/system-settings/tag-setting/TagSettingDialog.vue'
import NameUtil from '@/utils/NameUtil'
import StoreDefineTagSetting from '@/define/store/main/functions/system-settings'

@Component({
  components: {TagsSettingDialog}
})
export default class TagsSetting extends Vue {
  showTagsSettingDialog() {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagSetting.SET_TAG_SETTING_DIALOG_VISIBLE), true)
  }
}
</script>

<style scoped>

</style>
