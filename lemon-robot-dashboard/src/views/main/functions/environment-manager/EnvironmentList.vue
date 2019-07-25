<template>
  <div class="environment-list-impl">
    <environment-add-comp></environment-add-comp>
    <environment-component-list></environment-component-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EnvironmentAddComp from './EnvironmentAddComp.vue'
import EnvironmentComponentList from './EnvironmentComponentList.vue'

@Component({
  components: {
    EnvironmentAddComp, EnvironmentComponentList
  }
})
export default class EnvironmentList extends Vue {
}
</script>

<style scoped lang="scss">
  .environment-list-impl {
    padding: 10px 20px;
  }
</style>
