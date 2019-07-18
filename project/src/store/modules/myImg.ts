import { imgFn, colorFn, fnImg } from "../../services"
function imgDataFn(arr: Array<Object>) {
    arr.map((item: any) => {
        item.List.map((val: any) => {
            val.Url = val.Url.replace("{0}", "3")
        })
    })
    return arr
}
const state = {
    imgList: [] = [],
    colorList: {},
}
const actions = {
    imgActions({ commit }: { commit: Function }, params: any) {
        imgFn(params).then((res: any) => {
            commit("imgMua", res.data)
        })
    },
    colorActions({ commit }: { commit: Function }, params: any) {
        colorFn(params).then((res: any) => {
            commit("colorMua", res.data)
        })
    },
    ColorCar({ commit }: { commit: Function }, params: any) {
        fnImg(params).then((res: any) => {
            commit("imgcarMua", res.data)
        })
    }
}
const mutations = {
    imgMua(state: any, data: any) {
        state.imgList = imgDataFn(data)
    },
    colorMua(state: any, obj: Object) {
        state.colorList = obj;
    },
    imgcarMua(state: any, data: any) {
        state.imgList = imgDataFn(data)
        console.log('......',state.imgList)
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}

