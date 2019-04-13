import React from 'react'
import {PAY_STATUS} from '@config'
import moment from "moment";

export default function () {
    return [
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: '充值IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '充值时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(val) {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render(val) {
                const item = PAY_STATUS[val];
                return <i style={{color: item?.color}}>{item?.text}</i>;
            },
        },
        {
            title: '订单备注',
            dataIndex: 'returnInfo',
            key: 'returnInfo',
        },

    ]
}
