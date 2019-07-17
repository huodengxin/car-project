import { quotationFn, cityFn, addressFn, addressConFn } from '../../services'


const state = {
  quotationData: [] = [],
  cityId: '',
  CityName: '',
  addressList: [] = [],
  addressConList: [] = [],
  //定位地址
  location: '',
  //定位地址id
  locationId: ''
}

const getters = {

}
//异步
const actions = {
  //获取cityid
  cityActions({ commit }: { commit: Function }) {
    cityFn().then((res: any) => {
      state.location = res.data.CityName;
      state.locationId = res.data.CityID
      commit('cityMu', res.data)
    })
  },
  //询低价
  dataActions({ commit }: { commit: Function }, params: Object) {
    quotationFn(params).then((res: any) => {
      res.data.list = res.data.list.map((item: any) => {
        item.price = item.vendorPrice.slice(0, item.vendorPrice.indexOf('.') + 1);
        return item
      })
      commit('dataMu', res.data)
    })
  },
  addressActions({ commit }: { commit: Function }) {
    addressFn().then((res: any) => {
      commit('addressMu', res.data)
    })
  },
  //获取address中城市
  addressConActions({ commit }: { commit: Function }, payload: any) {
    addressConFn(payload).then((res: any) => {
      commit('addressConMu', res.data)
    })
  },
}
//同步
const mutations = {
  dataMu(state: any, data: any) {
    state.quotationData = [data]
  },
  cityMu(state: any, obj: any) {
    state.cityId = obj.CityID;
    state.CityName = obj.CityName
  },
  addressMu(state: any, data: any) {
    state.addressList = [...data]
  },
  addressConMu(state: any, data: any) {
    state.addressConList = [...data]
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


