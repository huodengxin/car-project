import request from "../utils/request"
export function imgFn(params:any):Promise<Object>{
    return request({
        url:'/v2-car-getImageList.html?SerialID='+params,
        method:'GET'
    })
} 