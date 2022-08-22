<template>
  <v-sheet>
    <v-row>
      <v-col cols="3"
        ><v-select
          v-model="select"
          @change="update()"
          :items="items"
          outlined
          dense
          hide-details
          label="カタログで検索する"
        ></v-select
      ></v-col>
      <v-col cols="6"
        ><v-alert v-if="select.length > 0" dense color="red lighten-2" dark>
          {{ select }}を表示中
        </v-alert></v-col
      >
    </v-row>
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
