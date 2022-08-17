<template>
  <v-app>
    <v-main>
      <v-app-bar dense color="#002566" dark>
        <v-toolbar-title>CS-NET モデル着用商品データーベース</v-toolbar-title>
      </v-app-bar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap');
html,
body {
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
