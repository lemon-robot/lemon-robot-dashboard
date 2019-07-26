<template>
  <div class="environment-manager-impl">
    <v-card class="environment-component-view">
      <v-tabs vertical class="v-tabs-content">
        <v-tab>
          <v-icon left>el-icon-component</v-icon>
          Environment-Component
        </v-tab>
        <v-tab>
          <v-icon left>el-icon-runtime_environment</v-icon>
          Runtime-Environment
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <environment-component-add></environment-component-add>
            <environment-component-list></environment-component-list>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            未完待續！！！
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EnvironmentComponentAdd from './environment-component/EnvironmentComponentAdd.vue'
import EnvironmentComponentList from './environment-component/EnvironmentComponentList.vue'

@Component({
  components: {
    EnvironmentComponentAdd, EnvironmentComponentList
  }
})
export default class EnvironmentManager extends Vue {
}
</script>

<style scoped lang="scss">
  .environment-manager-impl {
    display: flex;
    flex-direction: column;
    height: 100%;

    .environment-component-view {
      height: 100%;
    }
  }
</style>
<style lang="scss">
  .environment-manager-impl {
    .environment-component-view {
      .v-tabs__container {
        background: #f0f0f0 !important;

        .v-tabs__slider-wrapper {
          .accent {
            background: var(--primary) !important;
            border: 1px solid var(--primary) !important;
          }
        }
      }
    }
  }
</style>
