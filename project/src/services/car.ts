import request from '../utils/request';
//获取汽车页详情
export function carFn(params: any): Promise<void> {
    return request.get("/v2-car-getInfoAndListById.html?SerialID=" + params)
}