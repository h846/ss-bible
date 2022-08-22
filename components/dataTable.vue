<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="-1"
    :sort-by="['ID']"
    :sort-desc="true"
    height="700"
    fixed-header
    dense
    hide-default-footer
    no-data-text="このカタログのデータはありませんでした。"
  >
    <template v-slot:item.CAT_PAGE="{ item }">
      <v-icon color="red" v-if="item.CAT_MNORWM == 'WOMENS'"
        >mdi-gender-female
      </v-icon>
      <v-icon color="blue" v-if="item.CAT_MNORWM == 'MENS'"
        >mdi-gender-male</v-icon
      >
      <v-icon color="purple" v-if="item.CAT_MNORWM == 'MENS+WOMENS'"
        >mdi-gender-male-female</v-icon
      >
      {{ item.CAT_PAGE }}
    </template>

    <template v-slot:item.PRD_NAME="{ item }">
      <span class="ml-1">{{ item.PRD_STYLE }}</span>
      <span class="ml-1">{{ item.PRD_NAME }}</span>
      <span class="ml-1">{{ item.PRD_COLOR_CODE }}</span>
      <span class="ml-1">{{ item.PRD_COLOR_NAME }}</span>
    </template>

    <template v-slot:item.ALT_CAT_NAME="{ item }">
      <v-icon color="red" v-if="item.ALTCAT_MNORWM == 'WOMENS'"
        >mdi-gender-female
      </v-icon>
      <v-icon color="blue" v-if="item.ALTCAT_MNORWM == 'MENS'"
        >mdi-gender-male</v-icon
      >
      <v-icon color="purple" v-if="item.ALTCAT_MNORWM == 'MENS+WOMENS'"
        >mdi-gender-male-female</v-icon
      >
      <span class="ml-1">{{ item.ALT_CAT_CODE }}</span>
      <span class="ml-1">{{ item.ALT_CAT_NAME }}</span>
      <span class="ml-1">{{ item.ALT_CAT_COM }}</span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'dataTablePage',
  data() {
    return {
      headers: [
        { text: 'ページ', value: 'CAT_PAGE' },
        { text: '商品の場所', value: 'CAT_COM' },
        { text: '商品の詳細', value: 'PRD_NAME' },
        { text: '他の掲載カタログ', value: 'ALT_CAT_NAME' },
      ],
    }
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
