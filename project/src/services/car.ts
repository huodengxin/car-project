import request from '../utils/request';
export function carFn(params:any):Promise<void>{
    return request.get("/v2-car-getInfoAndListById.html?SerialID="+params)
}