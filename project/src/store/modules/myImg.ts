import {imgFn} from "../../services"
function imgDataFn(arr:Array<Object>){
    arr.map((item:any)=>{
        item.List.map((val:any)=>{
            val.Url=val.Url.replace("{0}","3")
        })
    })
    return arr
}
const state={
    imgList:[]=[]
}
const actions={
    imgActions({commit}:{commit:Function},params:any){
        imgFn(params).then((res:any)=>{
            commit("imgMua",res.data)
        })
    }
}
const mutations={
    imgMua(state:any,data:any){
        state.imgList=imgDataFn(data)
    }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
 }
 
 