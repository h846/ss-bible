<template>
  <v-container>
    <v-alert dense type="info" elevation="2">
      カタログのモデルが着ている商品の一覧を見ることが出来ます。
      一覧にない商品をお探しの場合はSS(内線#5999)までお問い合わせください。
    </v-alert>
    <catalog-selector />
    <data-table />
    <v-overlay :value="loading">
      <p>データ取得中</p>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    }
  },
  created() {
    this.$store.dispatch('fetchData').then((res) => {
      this.loading = false
    })
    this.$store.dispatch('fetchCatalogData')
  },
}
</script>
