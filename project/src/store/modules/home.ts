import {homeFn} from '../../services'
function mapData(data:any,codeData:any){
   return codeData.map((el:any,key:any)=>{
      el={
         code:el
      }
      el.list=[]
      data.forEach((item:any)=>{
         if(item.Spelling.slice(0,1)==el.code){
            el.list.push(item)
         }
      })
      return el
   })
}

function codeFn(data:Array<Object>){
   let arr:any=[];
   data.forEach((item:any)=>{
      if(!arr.includes(item.Spelling.slice(0,1))){
         arr.push(item.Spelling.slice(0,1))
      }
   })
   return arr
}

const state={
    slideList:[]=[],
    homeData:[]=[]
}

const getters = {
   
}
//异步
const actions={
   dataActions({commit}: {commit: Function}){
      homeFn().then((res:any)=>{
          commit('dataMu',res.data)
      })
   }
}
//同步
const mutations={
   dataMu(state: any,data:Array<Object>){
      state.slideList=codeFn(data)
      state.homeData=mapData(data,state.slideList)
   }
}


export default {
   namespaced:true,
   state,
   getters,
   actions,
   mutations
}


