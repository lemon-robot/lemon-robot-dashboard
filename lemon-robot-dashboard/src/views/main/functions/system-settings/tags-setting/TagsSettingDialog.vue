<template>
  <div>
    <!--<el-dialog-->
    <!--:title="$t(lang+'setting_dialog_title')"-->
    <!--:visible.sync="dialogVisible"-->
    <!--width="30%"-->
    <!--:before-close="hideTagsSettingDialog"-->
    <!--&gt;-->
    <!--<span>这是一段信息</span>-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button size="small" @click="hideTagsSettingDialog">{{$t(lang+'cancel_btn_title')}}</el-button>-->
    <!--<el-button size="small" type="primary" @click="hideTagsSettingDialog">{{$t(lang+'ok_btn_title')}}</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
    <v-dialog
        v-model="dialogVisible"
        width="500"
    >
      <v-card>
        <v-card-title
            class="headline grey lighten-2"
            primary-title
        >
          {{$t(lang+'setting_dialog_title')}}
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="cancel"
              flat
              @click="hideTagsSettingDialog"
          >
            {{$t(lang+'cancel_btn_title')}}
          </v-btn>
          <v-btn
              color="primary"
              flat
              @click="hideTagsSettingDialog"
          >
            {{$t(lang+'ok_btn_title')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NameUtil from '@/utils/NameUtil'
import StoreDefineTagsSetting from '@/define/store/main/functions/system-settings'
import {Watch} from 'vue-property-decorator'

@Component
export default class TagsSettingDialog extends Vue {
  readonly lang: string = 'main.functions.system_settings.tags_setting.'
  dialogVisible: boolean = false

  mounted() {
    console.log(this.$store.getters[NameUtil.CSCK(StoreDefineTagsSetting.GET_TAGS_SETTING_DIALOG_VISIBLE)])
  }

  get tagsSettingDialogVisible(): boolean {
    return this.$store.getters[NameUtil.CSCK(StoreDefineTagsSetting.GET_TAGS_SETTING_DIALOG_VISIBLE)]
  }

  hideTagsSettingDialog() {
    this.$store.commit(NameUtil.CSCK(StoreDefineTagsSetting.SET_TAGS_SETTING_DIALOG_VISIBLE), false)
  }

  @Watch('tagsSettingDialogVisible')
  onDialogStateChange(tagsSettingDialogVisible: boolean) {
    this.dialogVisible = tagsSettingDialogVisible
  }
}
</script>

<style scoped>

</style>
