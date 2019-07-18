import { imgFn, colorFn, fnImg, changeImg } from "../../services"
function imgDataFn(arr: Array<Object>) {
    arr.map((item: any) => {
        item.List.map((val: any) => {
            val.Url = val.Url.replace("{0}", "3")
        })
    })
    return arr
}
function imgChanges(arr: Array<Object>) {
    arr.map((item: any) => {
        item.Url = item.Url.replace("{0}", "3")
    })
    return arr
}
const state = {
    imgList: [] = [],
    colorList: {},
    imgNewList: [] = [],
    Count: ""
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
    },
    changeImgs({ commit }: { commit: Function }, params: any) {
        changeImg(params).then((res: any) => {
            commit("changeimgMua", res.data)
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
    },
    changeimgMua(state: any, data: any) {
        console.log("data...", data)
        state.imgNewList = imgChanges(data.List)
        state.Count = data.Count
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}

