<template>
  <div class="environment-add-comp">
    <el-button type="primary" icon="el-icon-folder-add" size="small" @click="AddComponent">{{$t(lang +
      'add_ev_component')}}
    </el-button>
    <v-dialog v-model="showAddComp" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">{{$t(lang + 'add_dialog_title')}}</v-card-title>
        <div style="margin: 0 25px;">
          <v-text-field
              v-model="environmentComponentName"
              label="EnvironmentComponentName"
              required
          ></v-text-field>
          <v-text-field
              v-model="environmentComponentDescribe"
              label="EnvironmentComponentDescribe"
              required
          ></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" flat="flat" @click="showAddComp = false">{{$t(lang +
            'cancel_btn_title')}}
          </v-btn>
          <v-btn color="primary" flat="flat" @click="saveComponent">
            {{$t(lang + 'ok_btn_title')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EnvironmentService from '@/service/environment/EnvironmentService'
import EnvironmentComponent from '@/dto/EnvironmentComponent'

@Component
export default class EnvironmentComponentAdd extends Vue {
  lang = 'main.functions.environment_manager.environment_component_add.'
  showAddComp: boolean = false
  loadingState: boolean = false
  environmentComponentName: string = ''
  environmentComponentDescribe: string = ''

  AddComponent() {
    this.showAddComp = true
    this.environmentComponentName = ''
    this.environmentComponentDescribe = ''
  }

  saveComponent() {
    EnvironmentService.CreateEvComponents(this.environmentComponentName, this.environmentComponentDescribe).then(resp => {
      if (resp) {
        this.$notify.success({
          title: this.$t(this.lang + 'add_ev_component_success_title').toString(),
          message: this.$t(this.lang + 'add_ev_component_success_view').toString()
        })
        this.showAddComp = false
      }
    }).catch(() => {
      this.showAddComp = false
    })
  }
}
</script>

<style scoped lang="scss">
  .environment-add-comp {
    display: flex;
    justify-content: flex-start;
    padding: 10px 10px;

    .add-center {
      margin: 0 25px;
    }
  }
</style>
