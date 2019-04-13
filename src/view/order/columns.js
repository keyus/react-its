import React from 'react'
import moment from 'moment'
import {Divider} from 'antd'
import util from '@util'
import {CALLBACK_STATUS, PAY_TYPE, WITHDRAW_STATUS} from '@config'

export default function (self) {
    return [
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: '250px'
        },
        {
            title: '交易日期',
            dataIndex: 'createTime',
            key: 'createTime',
            sorter: true,
            width: '200px',
            render(val) {
                return moment(val).format('YYYY-MM-DD HH:mm:ss')
            },
        },
        {
            title: '玩家ID',
            dataIndex: 'userId',
            key: 'userId',
            width: '150px',
        },
        {
            title: '提现金额',
            dataIndex: 'money',
            key: 'money',
            width: '200px',
            sorter: true,
            render(val) {
                return util.formatMoney(val)
            }
        },
        {
            title: '提现类型',
            width: '120px',
            dataIndex: 'payType',
            key: 'payType',
            render(val) {
                return PAY_TYPE[val] || '未知'
            }
        },
        {
            title: '提现账号',
            width: '250px',
            render(item){
                return item.cardAccount || item.aliAccount
            }
        },
        {
            title: '姓名',
            dataIndex: 'realName',
            key: 'realName',
            width: '150px',
        },
        {
            title: '回调地址',
            dataIndex: 'notifyUrl',
            key: 'notifyUrl',
            width: '120px',
            render(val){
                return val || '--'
            }
        },
        {
            title: '提现状态',
            dataIndex: 'status',
            key: 'status',
            width: '180px',
            align: 'right',
            render(val) {
                const item = WITHDRAW_STATUS[val];
                return <i style={{color: item?.color}}>{item?.text}</i>;
            },
        },
        {
            title: '回调状态',
            dataIndex: 'callbackStatus',
            key: 'callbackStatus',
            width: '120px',
            align: 'right',
            render(val) {
                const item = CALLBACK_STATUS[val];
                return <i style={{color: item?.color}}>{item?.text}</i>;
            },
        },
        {
            title: '操作',
            width: '200px',
            render(item) {
                return (
                    <span>
                        <a href="javascript:;" onClick={self.openEdit(item)}>编辑</a>
                        <Divider type="vertical"/>
                       <a href="javascript:;" onClick={self.orderCallBack(item)}>手动回调</a>
                    </span>
                )
            },
        },
    ]
}

/**
 * * 返回结果说明
 //平台id
 private Long id;
 //商户订单id
 private String merOrderId;
 //用户id
 private Integer userId;
 //游戏商户id
 private Integer merchantId;
 //提现电话号码
 private String phoneNum;
 //设备id
 private String mobileId;
 //提现人ip
 private String ip;
 //创建时间
 private String createTime;
 //成功时间
 private String sucTime;
 //  //DEAL(3), 完成状态
 //    //REQ_FAIL(2), 上报上游失败
 //    //REQ_SUCCESS(1), 上报上游成功
 //    //INIT(0); 初始状态
 private Integer status;
 //提现金额
 private Integer money;
 //渠道
 private String channel;
 //卡号
 private String cardAccount;
 //银行所在地
 private String bankAddress;
 //银行代码
 private String bankId;
 //提现人姓名
 private String realName;
 //提现人身份证（随机的）
 private String idCard;
 //提现备注或消息
 private String msg;
 //提现渠道
 private String extractCh;
 //费率
 private Integer charge;
 //所处理的pp实例id
 private int serverId;
 //上游渠道id
 private String upOrderId;
 */
