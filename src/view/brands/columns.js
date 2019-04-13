import React from 'react'
import {Divider} from 'antd'
export default function (self) {
    return [
        {
            title: '商户名',
            dataIndex: 'merchantName',
            key: 'merchantName',
        },
        {
            title: '操作',
            render(item) {
                return (
                    <span>
                        <a href="javascript:;" onClick={self.deleteItem(item)}>删除商户</a>
                        <Divider type="vertical"/>
                        <a href="javascript:;" onClick={self.openKey(item)}>重置密匙</a>
                    </span>
                )
            },
        },
    ]
}
