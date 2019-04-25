<template>
  <v-app id="app">
    <router-view class="router-root"/>
  </v-app>
</template>

<style lang="scss">
  #app {
    --primary: #1976D2;
    --secondary: #424242;
    --accent: #82B1FF;
    --error: #FF5252;
    --info: #2196F3;
    --success: #4CAF50;
    --warning: #FFC107;

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
