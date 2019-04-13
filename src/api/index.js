import http from '@http'

//登录
export const login = (data)=>{
    return http.post('/login',data);
}
//订单列表
export const playOrderList = (data)=>{
    return http.post('/pay/lucky/extract/record',data);
}

/**
 * 玩家-订单-手动回调
 * private List<String> orderNoList;
 private String payType;    1银行卡   |   2支付宝
 */
export const orderCallBack = (data)=>{
    return http.post('/pay/extract/order/confirm',data);
}

/**
 * 编辑回调地址
 private List<Long> orderNoList;
 private String callbackUrl;
 */
export const editCallBack = (data)=>{
    return http.post('/opt/edit/callback/url',data);
}

/**
 *上游账号列表
 private String username;
 private Integer page;
 private Integer rows;
 */
export const upAccount = (data)=>{
    return http.post('/opt/query/financial/account',data);
}


/**
 *账号列表
 private Integer roleType;
 private String name;
 private Integer page;
 private Integer rows;
 */
export const accoutList = (data)=>{
    return http.post('/account/query/account/list',data);
}

/**
 *创建账号
 private String username;
 private String password;
 private int roleType;
 private List<Integer> midList;
 */
export const createAccount = (data)=>{
    return http.post('/account/create/account',data);
}


/**
 *账号绑定商户
 private Integer accountId;
 private List<Integer> midList;
 */
export const bindMerchant = (data)=>{
    return http.post('/opt/bind/merchant',data);
}

/**
 *账号解绑商户
 private Integer accountId;
 private Integer mid;
 */
export const unbindMerchant = (data)=>{
    return http.post('/opt/unbind/merchant',data);
}




/**
 * 重置密码
 * private String password;
 */
export const resetPassword = (data)=>{
    return http.post('/account/edit/password',data);
}

/**
 * ip列表
 private String username;
 private String ip;
 private Integer page;
 private Integer rows;
 */
export const ipList = (data)=>{
    return http.post('/opt/query/ip/white/list',data);
}

/**
 * 添加ip
 private String username;
 private List<String> ips;
 */
export const addIp = (data)=>{
    return http.post('/opt/add/ip/white/list',data);
}

/**
 * 删除IP
 private String username;
 private List<String> ips;
 */
export const deleteIp = (data)=>{
    return http.post('/opt/del/ip/white/list',data);
}

/**
 * 商户列表 [品牌]
 private String merchantName;       //商户名
 private String isBindAccount;      //是否绑定  0 绑定   1未绑定
 */
export const brandList = (data)=>{
    return http.post('/account/query/merchant/list',data);
}

/**
 * 添加商户
 * private String merchantName;
 * private int key;
 */
export const addMerchant = (data)=>{
    return http.post('/account/add/merchant',data);
}

/**
 * 重置密钥
 * private String mid;
 */
export const resetKey = (data)=>{
    return http.post('/opt/update/key',data);
}

/**
 * 删除商户
 * private String mid;
 */
export const deleteMerchant = (data)=>{
    return http.post('/opt/del/merchant',data);
}

/**
 * 充值记录
 private String orderNo;
 private String status; //I,S,F
 private String beginTime;
 private String endTime;
 private Integer page;
 private Integer rows;
 */
export const payRecord = (data)=>{
    return http.post('/pay/lucky/pay/record',data);
}

/**
 * 获取充值网关
 * private long money;
 private String bankCode;
 private String orderSubject;
 private String goodsNo;
 private String returnInfo;
 */
export const gateway = (data)=>{
    return http.post('/pay/lucky/gateway',data);
}
