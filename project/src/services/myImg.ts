import request from "../utils/request"
export function imgFn(params:any):Promise<Object>{
    return request({
        url:'/v2-car-getImageList.html?SerialID='+params,
        method:'GET'
    })
} 
export function colorFn(params:string):Promise<Object>{
    return request({
        url:'v2-car-getModelImageYearColor.html?SerialID='+params,
        method:'GET'
    })
}
export function fnImg(params:any):Promise<Object>{
    return request({
        url:'/v2-car-getImageList.html?',
        method:'GET',
        params
    })
} 