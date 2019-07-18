import { homeFn } from '../../services'
function mapData(data: any, codeData: any) {
    return codeData.map((el: any, key: any) => {
        el = {
            code: el
        }
        el.list = []
        data.forEach((item: any) => {
            if (item.Spelling.slice(0, 1) == el.code) {
                el.list.push(item)
            }
        })
        return el
    })
}

function codeFn(data: Array<Object>) {
    let arr: any = [];
    data.forEach((item: any) => {
        if (!arr.includes(item.Spelling.slice(0, 1))) {
            arr.push(item.Spelling.slice(0, 1))
        }
    })
    return arr
}

const state = {
    slideList: [] = [],
    homeData: [] = []
}

const getters = {

}
//异步
const actions = {
    async dataActions({ commit }: { commit: Function }) {
        let data: any = await homeFn()
        state.slideList = codeFn(data.data)
        state.homeData = mapData(data.data, state.slideList)
        return data
    }
}
//同步
const mutations = {

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


