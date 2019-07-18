import { quotationFn, cityFn, addressFn, addressConFn,submitFn } from '../../services'


const state = {
  quotationData: [] = [],
  cityId: '',
  CityName: '',
  addressList: [] = [],
  addressConList: [] = [],
  //定位地址
  location: '',
  //定位地址id
  locationId: '',
  dealerIdStr:""
}

const getters = {

}
//异步
const actions={
   //获取cityid
    cityActions({commit}:{commit:Function}){
      cityFn().then((res:any)=>{
         state.location=res.data.CityName;
         state.locationId=res.data.CityID
         commit('cityMu',res.data)
      })
   },
   //询低价
   async dataActions({commit}:{commit:Function},params:Object){
       let res:any=await quotationFn(params);
       let dealerIdArr:any=[];
       res.data.list=res.data.list.map((item:any,index:any)=>{
         item.price=item.vendorPrice.slice(0,item.vendorPrice.indexOf('.')+1);
         if(index<3){
            item.addActive=true
         }else{
            item.addActive=false
         }
         if(item.addActive){
            dealerIdArr.push(item.dealerId)
         }
         return item
      })
      let arr:any=[];
      arr.push(res.data)
      state.quotationData=arr;
      state.dealerIdStr=dealerIdArr.join(',');
      return res
   },
   //获取地址
   addressActions({commit}:{commit:Function}){
    addressFn().then((res:any)=>{
      commit('addressMu',res.data)
    })
   },
   //获取address中城市
   addressConActions({commit}:{commit:Function},payload:any){
      addressConFn(payload).then((res:any)=>{
      commit('addressConMu',res.data)
      })
   },
   //提交 询最低价
   async submitActions({commit}:{commit:Function},payload:any){
      let data=await submitFn(payload)
     return data
   },
}
//同步
const mutations={
   cityMu(state:any,obj:any){
    state.cityId=obj.CityID;
    state.CityName=obj.CityName
   },
   addressMu(state:any,data:any){
    state.addressList=[...data]
   },
   addressConMu(state:any,data:any){
      state.addressConList=[...data]
   },
   changeActiveMu(state:any,ind:any){
      state.quotationData[0].list[ind].addActive=!state.quotationData[0].list[ind].addActive
   }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


