import http from '@http'

export const login = (data)=>{
    return http.post('/login',data);
}
export const playOrderList = (data)=>{
    return http.post('/pay/lucky/extract/record',data);
}
export const orderCallBack = (data)=>{
    return http.post('/pay/extract/order/confirm',data);
}
export const editCallBack = (data)=>{
    return http.post('/opt/edit/callback/url',data);
}
export const upAccount = (data)=>{
    return http.post('/opt/query/financial/account',data);
}
export const accoutList = (data)=>{
    return http.post('/account/query/account/list',data);
}
export const createAccount = (data)=>{
    return http.post('/account/create/account',data);
}
export const bindMerchant = (data)=>{
    return http.post('/opt/bind/merchant',data);
}
export const unbindMerchant = (data)=>{
    return http.post('/opt/unbind/merchant',data);
}
export const resetPassword = (data)=>{
    return http.post('/account/edit/password',data);
}
export const ipList = (data)=>{
    return http.post('/opt/query/ip/white/list',data);
}
export const addIp = (data)=>{
    return http.post('/opt/add/ip/white/list',data);
}
export const deleteIp = (data)=>{
    return http.post('/opt/del/ip/white/list',data);
}
export const brandList = (data)=>{
    return http.post('/account/query/merchant/list',data);
}
export const addMerchant = (data)=>{
    return http.post('/account/add/merchant',data);
}
export const resetKey = (data)=>{
    return http.post('/opt/update/key',data);
}
export const deleteMerchant = (data)=>{
    return http.post('/opt/del/merchant',data);
}
export const payRecord = (data)=>{
    return http.post('/pay/lucky/pay/record',data);
}
export const gateway = (data)=>{
    return http.post('/pay/lucky/gateway',data);
}
