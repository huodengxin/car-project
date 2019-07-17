import {drawerFn} from "../../services"

const state={
    drawerData:[]=[]
}

const getters = {
   
}
//异步
const actions={
   //抽屉详情
   drawerActions({commit}: {commit: Function},payLoad:string){
    drawerFn(payLoad).then((res:any)=>{
        commit("drawerList",res.data)
      })
   }
}
//同步
const mutations={
   //抽屉的数据
   drawerList(state: any,drawerData:any){
    state.drawerData=[...drawerData]
   }
}
export default {
   namespaced:true,
   state,
   getters,
   actions,
   mutations
}


