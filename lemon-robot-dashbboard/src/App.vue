<template>
  <v-app id="app">
    <router-view class="router-root"/>
  </v-app>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .router-root {
      display: flex;
      width: 100%;
      height: 100%;
    }
  }
</style>
