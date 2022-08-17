import axios from 'axios';
export const state = () => ({
  bibleData:[],
  bibleOriginalData:[],
  catalogData:[]
});

export const mutations = {
  setBibleData(state,data) {
    let ary = data.map(val=>{
      for(const i in val){
        val[i] = val[i] === 'null' ? '' : val[i]
      }
      return val;
    })
    if(ary.length > 1000){ary = ary.splice(0,20)}
    console.log(ary)
    state.bibleData = ary;
  },
  setBibleOriginalData(state,data) {
    let ary = data.map(val=>{
      for(const i in val){
        val[i] = val[i] === 'null' ? '' : val[i]
      }
      return val;
    })
    state.bibleOriginalData = ary;
  },
  setCatalogData(state,data){
    let ary = data.map(val=>{
      for(const i in val){
        val[i] = val[i] === 'null' ? '' : val[i]
      }
      return val;
    })
    state.catalogData = ary;
  }
};

export const actions = {
  async fetchData({ commit }) {
    await axios.post('http://lejnet/api-test/csnet/ss-bible').then(res=>{
      commit('setBibleData',res.data)
      commit('setBibleOriginalData',res.data)
    })
  },
  async fetchCatalogData({commit}){
    await axios.post('http://lejnet/api-test/csnet/catalogs').then(res=>{
      commit('setCatalogData',res.data)
    })
  }
};

export const getters = {
  getData(state) {
    return state.bibleData;
  },
  getCatalogData(state) {
    return state.catalogData;
  },
  getOriginalData(state) {
    return state.bibleOriginalData;
  }
};