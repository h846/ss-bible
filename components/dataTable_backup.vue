<template>
  <v-data-iterator
    :items="items"
    :items-per-page="-1"
    :sort-by="['ID']"
    :sort-desc="true"
    hide-default-footer
    no-data-text="このカタログのデータはありませんでした。"
  >
    <template v-slot:default="props">
      <v-row dense justify="center">
        <v-col
          v-for="item in props.items"
          :key="item.ID"
          cols="12"
          sm="4"
          lg="3"
          xl="2"
          class="mt-5"
        >
          <v-card class="mx-auto py-3" height="500">
            <v-list dense>
              <ul>
                <template v-for="(i, k, idx) in item">
                  <li v-if="k !== 'ID' && k !== 'PINT_FLG' && i !== ''">
                    <div>{{ i }}</div>
                    <div>{{ k }}</div>
                  </li>
                </template>
              </ul>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'dataTablePage',
  data() {
    return {}
  },
  computed: {
    items: function () {
      return this.$store.getters.getData
    },
  },
}
</script>
<style lang="scss">
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border: 5px solid #002566 !important;
}
ul {
  list-style-type: none;
  li {
    margin-bottom: 10px;
    div:nth-child(1) {
      line-height: 15px;
      font-weight: bold;
    }
    div:nth-child(2) {
      font-size: 0.7rem;
      line-height: 10px;
      color: #666;
    }
  }
}
</style>
