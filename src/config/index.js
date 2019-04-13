//角色类型
export const ROLE_TYPE = {
    1: '管理员',
    2: '商户',
    3: '运营值班',
    4: '账务',
}

//支付类型
export const PAY_TYPE = {
    1: '银行卡',
    2: '支付宝',
}

//提现-回调状态
export const CALLBACK_STATUS = {
    4: {
        color: '#f6bf7f',
        text: '处理中'
    },
    5: {
        color: '#50ab61',
        text: '成功'
    },
    6: {
        color: '#f27b71',
        text: '失败'
    },
}

//提现-回调状态
export const WITHDRAW_STATUS = {
    0: {
        color: '#f6bf7f',
        text: '处理中'
    },
    1: {
        color: '#f6bf7f',
        text: '上报上游成功'            //上报上游成功
    },
    2: {
        color: '#f27b71',
        text: '上报上游失败'            //上报上游失败
    },
    3: {
        color: '#50ab61',
        text: '完成'                   //完成状态
    },
}

//充值状态S:成功
// I:处理中
// F:失败
export const PAY_STATUS = {
    S: {
        color: '#50ab61',
        text: '成功'
    },
    I: {
        color: '#f6bf7f',
        text: '处理中'            //上报上游成功
    },
    F: {
        color: '#f27b71',
        text: '失败'            //上报上游失败
    },
}
