<template>
  <div class="system-settings-impl">
    system settings.impl
    <tags-setting></tags-setting>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import TagsSetting from '@/views/main/functions/system-settings/tags-setting/TagsSetting.vue'
  @Component({
    components: { TagsSetting }
  })
  export default class SystemSettings extends Vue {
  }
</script>

<style scoped>

</style>
