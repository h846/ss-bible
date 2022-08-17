<template>
  <v-sheet width="275">
    <v-select
      v-model="select"
      @change="update()"
      :items="items"
      outlined
      dense
      hide-details
      label="カタログから検索"
    ></v-select>
  </v-sheet>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      select: [],
    }
  },
  computed: {
    items: function () {
      let data = this.$store.getters.getCatalogData.map((val) => {
        return `${val.CAT_ID} ${val.CAT_NAME}`
      })
      return data
    },
  },
  created() {
    console.log(this.items)
  },
  methods: {
    update() {
      let catID = this.select.split(' ')
      catID = catID[0]

      let list = this.$store.getters.getOriginalData.filter((val) => {
        return val.CAT_CODE === catID
      })
      console.log({ list })
      this.$store.commit('setBibleData', list)
    },
  },
}
</script>
<style></style>
