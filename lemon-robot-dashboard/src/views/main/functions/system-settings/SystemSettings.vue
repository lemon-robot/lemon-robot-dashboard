<template>
  <div class="system-settings-impl">
    system settings.impl
    <tag-setting></tag-setting>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TagSetting from '@/views/main/functions/system-settings/tag-setting/TagSetting.vue'

@Component({
  components: {TagSetting}
})
export default class SystemSettings extends Vue {
}
</script>

<style scoped>

</style>
