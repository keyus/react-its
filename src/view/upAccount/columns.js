import React from 'react'
import {ROLE_TYPE} from '@config'
import util from '@util'
export default function (self) {
    const col = [
        {
            title: '上游账号',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '余额',
            dataIndex: 'balanceMoney',
            key: 'balanceMoney',
            sorter: true,
            render(val) {
                return util.formatMoney(val)
            }
        },
        {
            title: '今日支付总额',
            dataIndex: 'todayPayMoney',
            key: 'todayPayMoney',
            sorter: true,
            render(val) {
                return util.formatMoney(val)
            }
        },
        {
            title: '历史支付总额',
            dataIndex: 'totalPayMoney',
            key: 'totalPayMoney',
            sorter: true,
            render(val) {
                return util.formatMoney(val)
            }
        },
    ]
    if(util.getRole() === 4){
        col.push({
            title: '操作',
            render(item) {
                if(util.getRole() === 4){
                    return <a href="javascript:;" onClick={self.openPay(item)}>充值</a>;
                }
                return '/'
            }
        })
    }
    return col;
}
