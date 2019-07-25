<template>
  <div class="environment-manager-impl">
    <!--<v-tabs>-->
      <!--<v-tab>Item One</v-tab>-->
      <!--<v-tab>Item Two</v-tab>-->
      <!--<v-tab-item>-->
        <!--<v-card>-->
          <!--<environment-component-add></environment-component-add>-->
          <!--<environment-component-list></environment-component-list>-->
        <!--</v-card>-->
        <!--<v-card></v-card>-->
      <!--</v-tab-item>-->
    <!--</v-tabs>-->
    <!--<environment-component-add></environment-component-add>-->
    <!--<environment-component-list></environment-component-list>-->

    <v-card>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
          Environment-Component
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
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
  }
</style>
