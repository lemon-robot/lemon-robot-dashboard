<template>
  <div class="environment-component-list">
    <div class="component-content" v-for="item in componentsList" :key="item.environmentComponentKey">
      <div class="component-item">
        <div>
          <div>{{item.environmentComponentName}}</div>
          <div>{{item.environmentComponentDescription}}</div>
        </div>
        <div style="display: flex">
          <el-button type="primary" icon="el-icon-edit" circle
                     @click="managerVersion(item.environmentComponentKey)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle
                     @click="deleteComponent(item.environmentComponentKey)"></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import EnvironmentService from '@/service/environment/EnvironmentService'
import EnvironmentComponent from '@/dto/EnvironmentComponent'

@Component
export default class EnvironmentComponentList extends Vue {
  componentsList: EnvironmentComponent[] = []

  mounted() {
    this.getComponentList()
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

  deleteComponent(componentKey: string) {
    console.log(componentKey)
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
