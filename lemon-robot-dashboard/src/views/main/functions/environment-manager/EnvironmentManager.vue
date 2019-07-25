<template>
  <div class="environment-manager-impl">
    <environment-list class="environment-list"></environment-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import EnvironmentList from './EnvironmentList.vue'

@Component({
  components: {
    EnvironmentList
  }
})
export default class EnvironmentManager extends Vue {
}
</script>

<style scoped lang="scss">
  .environment-manager-impl {
    .environment-list {
      display: flex;
      flex-direction: column;
    }

  }
</style>
