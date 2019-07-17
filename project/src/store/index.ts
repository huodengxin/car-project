import Vue from 'vue'
import Vuex from 'vuex'
import home from "./modules/home"
import car from "./modules/car"
import draw from "./modules/draw"
import quotation from "./modules/quotation"
import myImg from "./modules/myImg"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules:{
    home,
    car,
    draw,
    quotation,
    myImg
  }
})
