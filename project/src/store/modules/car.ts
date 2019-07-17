import { carFn } from "../../services"
//处理年份的函数
function arrFn(arr: any): any {
    let yearArr: any = [];
    arr.forEach((item: any) => {
        yearArr.unshift("全部")
        yearArr.push(item.market_attribute.year)
    })
    return Array.from(new Set(yearArr))
}
//处理列表数据
function listArr(arr: any, year: string): Array<string> {
    if (year == "全部") {
        return arr;
    } else {
        return arr.filter((item: any) => item.market_attribute.year == year)
    }
}
function sortNumber(a: any, b: any): number {
    return a.slice(0, 3) - b.slice(0, 3)
}
function numberSort(a: any, b: any): number {
    return a.slice(5, 8) - b.slice(5, 8)
}
function titleFn(arr: any): Array<Object> {
    let titleList: any = [];
    let data: any = [];
    let list: any = []
    arr.map((item: any) => {
        titleList.push(`${item.exhaust_str}/${item.max_power_str}${item.inhale_type}`)
    })
    titleList = Array.from(new Set(titleList))
    titleList.sort(sortNumber).sort(numberSort)
    titleList.map((val: any) => {
        let list: any = [];
        arr.map((item: any) => {
            if (`${item.exhaust_str}/${item.max_power_str}${item.inhale_type}` === val) {
                list.push(item)
            }
        })
        data.push({ index: val, list })
    })
    return data
}

const state = {
    obj: {} = {},
    dealer_price: "",
    official_refer_price: "",
    list: [] = [],
    yearArr: [] = [],
    newList: [] = [],
    titleList: [] = []
}
const actions = {
    carActions({ commit }: { commit: Function }, payLoad: string) {
        carFn(payLoad).then((res: any) => {
            commit("carMutations", res.data)
        })
    }
}
const mutations = {
    carMutations(state: any, obj: any) {
        state.obj = obj;
        state.yearArr = arrFn(obj.list);
        state.list = obj.list;
        state.newList = titleFn(obj.list);
        state.dealer_price = obj.market_attribute.dealer_price;
        state.official_refer_price = obj.market_attribute.official_refer_price;
    },
    changeYear(state: any, item: string) {
        state.newList = titleFn(listArr(state.list, item))
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}

