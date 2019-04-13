import React from 'react'
import {Tag} from 'antd'
import {ROLE_TYPE} from '@config'
export default function (self) {
    return [
        {
            title: '商户账号',
            dataIndex: 'username',
            key: 'username',
            width: '200px',
        },
        {
            title: 'ip地址',
            dataIndex: 'ips',
            key: 'ips',
            render(ips) {
                return (
                    <>
                        {
                            ips.map((it,key)=>(
                                <Tag key={key}>{it}</Tag>
                            ))
                        }
                    </>
                )
            },
        },
        {
            title: '操作',
            width: '250px',
            render(item) {
                return (
                    <span>
                        <a href="javascript:;" onClick={self.openEdit(item)}>编辑</a>
                    </span>
                )
            },
        },
    ]
}
