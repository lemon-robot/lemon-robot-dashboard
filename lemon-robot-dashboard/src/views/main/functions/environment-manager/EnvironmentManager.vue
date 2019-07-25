<template>
  <div class="environment-manager-impl">
    <environment-add-comp></environment-add-comp>
    <environment-component-list></environment-component-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EnvironmentAddComp from './EnvironmentComponentAdd.vue'
import EnvironmentComponentList from './EnvironmentComponentList.vue'

@Component({
  components: {
    EnvironmentAddComp, EnvironmentComponentList
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
