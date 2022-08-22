<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <catalogSelector />
      </v-col>
      <v-col cols="2">
        <v-dialog v-model="createDialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              新規作成
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Catalog Code" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Catalog Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Catalog Page"
                      persistent-hint
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field label="Item Location" required></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field label="Style#" required></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field label="Item Name" required></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Color Code" required></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Color Name" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="createDialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click=""> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

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
      <template v-slot:item.actions="{ item }">
        <v-icon small color="red" @click.stop="openDeleteDialog(item.ID)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h6"> 本当に削除しますか？ </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            キャンセル
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteItem()">
            削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import CatalogSelector from '~/components/catalogSelector.vue'
export default {
  name: 'dataTablePage',
  data() {
    return {
      headers: [
        { text: 'ページ', value: 'CAT_PAGE' },
        { text: '商品の場所', value: 'CAT_COM' },
        { text: '商品の詳細', value: 'PRD_NAME' },
        { text: '他の掲載カタログ', value: 'ALT_CAT_NAME' },
        { text: '削除', value: 'actions', sortable: false },
      ],
      deleteItemID: null,
      deleteDialog: false,
      createDialog: false,
    }
  },
  computed: {
    items: function () {
      return this.$store.getters.getData
    },
  },
  created() {
    this.$store.dispatch('fetchData')
    this.$store.dispatch('fetchCatalogData')
  },
  methods: {
    openDeleteDialog(id) {
      this.deleteDialog = true
      this.deleteItemID = id
    },
    async deleteItem() {
      const id = this.deleteItemID
      const sql = `DELETE FROM CSNET.SS_BIBLE WHERE ID = ${id}`
      await axios
        .post('http://lejnet/api-test/csnet/ss-bible', { sql })
        .then((res) => {
          this.$store.dispatch('fetchData').then((res) => {
            this.deleteDialog = false
          })
        })
    },
  },
  components: { CatalogSelector },
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
