import Vue from "vue";
import Vuex from "vuex";
import shopcart from './shopcart.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    shopcart: shopcart
  }
})

export default store
