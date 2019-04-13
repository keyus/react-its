import React from 'react'
import {Divider, Tag} from 'antd'
import {ROLE_TYPE} from '@config'
import util from '@util'
export default function (self) {
    return [
        {
            title: '账号权限',
            dataIndex: 'roleType',
            key: 'roleType',
            width: '200px',
            render(val) {
                return ROLE_TYPE[val] || val;
            }
        },
        {
            title: '账号',
            dataIndex: 'username',
            key: 'username',
            width: '150px',
        },
        {
            title: '商户',
            dataIndex: 'merchantList',
            key: 'merchantList',
            render(list) {
                return (
                    <div className='list-tag'>
                        {
                            list?.map((it,key)=>(
                                <Tag key={key} style={{fontSize: '14px'}}>{it.merchantName}</Tag>
                            ))
                        }
                    </div>
                );
            }
        },

        {
            title: '操作',
            width: '250px',
            render(item) {
                if(util.getRole() === 2){
                    return (
                        <a href="javascript:;" onClick={self.openPassword(item)} >重置密码</a>
                    );
                }
                return (
                    <span>
                        {
                            item.roleType === 2 &&
                            <>
                                <a href="javascript:;" onClick={self.openEdit(item)}>编辑</a>
                                <Divider type="vertical"/>
                            </>
                        }

                        <a href="javascript:;" onClick={self.openPassword(item)} >重置密码</a>
                    </span>
                )
            },
        },
    ]
}
