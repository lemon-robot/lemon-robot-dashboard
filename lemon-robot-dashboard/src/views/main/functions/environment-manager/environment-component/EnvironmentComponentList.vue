<template>
  <div class="environment-component-list">
    <div class="component-content" v-for="(item,index) in componentsList" :key="index">
      <div class="component-item">
        <div>
          <div>{{item.environmentComponentName}}</div>
          <div>{{item.environmentComponentDescription}}</div>
        </div>
        <div style="display: flex">
          <el-button type="primary" icon="el-icon-edit" circle
                     @click="managerVersion(item.environmentComponentKey)"></el-button>

          <el-tooltip class="item" effect="dark" :content="$t(lang + 'environment_component_list_item_tooltip')"
                      placement="top-start"
                      :disabled="item.EnvironmentComponentVersionCount<=0">
            <div style="margin-left: 10px">
              <el-button type="danger" icon="el-icon-delete" circle
                         @click="deleteComponent(item.environmentComponentKey,index)"
                         :disabled="item.EnvironmentComponentVersionCount>0"></el-button>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import EnvironmentService from '@/service/environment/EnvironmentService'
import EnvironmentComponent from '@/dto/EnvironmentComponent'
import NameUtil from '@/utils/NameUtil'
import StoreDefineEnvironmentManager from '@/define/store/main/functions/environment-manager'

@Component
export default class EnvironmentComponentList extends Vue {
  lang = 'main.functions.environment_manager.environment_component_list.'
  componentsList: EnvironmentComponent[] = []

  mounted() {
    this.getComponentList()
  }

  get environmentComponentListState(): boolean {
    return this.$store.getters[NameUtil.CSCK(StoreDefineEnvironmentManager.GET_ENVIRONMENT_COMPONENT_LIST)]
  }

  @Watch('environmentComponentListState')
  OnEnvironmentComponentListState(environmentComponentListStates: boolean) {
    if (environmentComponentListStates) {
      this.getComponentList()
    }
  }

  getComponentList() {
    EnvironmentService.GetEvComponentsList().then((data: EnvironmentComponent[]) => {
      console.log(data)
      this.componentsList = data
    }).catch(err => {
      console.log(err)
    })
  }

  managerVersion(componentKey: string) {
    console.log(componentKey)
  }

  deleteComponent(componentKey: string, index: number) {
    EnvironmentService.DeleteEvComponents(componentKey).then(resp => {
      if (resp) {
        this.$notify.success({
          title: this.$t(this.lang + 'delete_ev_component_success_title').toString(),
          message: this.$t(this.lang + 'delete_ev_component_success_view').toString()
        })
        this.componentsList.splice(index, 1)
        this.getComponentList()
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">
  .environment-component-list {
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .component-content {
      width: 100%;
      height: 100%;
      margin-bottom: 5px;

      .component-item {
        padding: 0px 10px;
        width: 100%;
        height: 80px;
        border: 1px solid #cccccc;
        border-radius: 10px;
        border-top: 4px solid var(--primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
