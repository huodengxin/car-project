import request from "../utils/request"
export function imgFn(params: any): Promise<Object> {
    return request({
        url: '/v2-car-getImageList.html?SerialID=' + params,
        method: 'GET'
    })
}
//获取颜色盒子
export function colorFn(params: string): Promise<Object> {
    return request({
        url: 'v2-car-getModelImageYearColor.html?SerialID=' + params,
        method: 'GET'
    })
}
//初始图片页
export function fnImg(params: any): Promise<Object> {
    return request({
        url: '/v2-car-getImageList.html',
        method: 'GET',
        params
    })
}
//图片视图
export function changeImg(params: any): Promise<Object> {
    return request({
        url: '/v2-car-getCategoryImageList.html',
        method: 'GET',
        params
    })
}