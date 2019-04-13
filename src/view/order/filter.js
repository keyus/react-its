import React, {Component} from 'react';
import moment from 'moment';
import {Row, Col, Input, Button, DatePicker, Select, Radio, Icon} from 'antd'
import {PAY_TYPE, CALLBACK_STATUS, WITHDRAW_STATUS} from '@config'

const formatDate = 'YYYY-MM-DD HH:mm:ss';
const {RangePicker} = DatePicker;
const {Option} = Select;
export default class Filter extends Component {
    static defaultProps = {
        filter: {},
        selectedRowKeys: [],
        onChange() {},
        openEditMore() {},
    }
    state = {
        showMore: false,
    }
    toggle = () => {
        this.setState({
            showMore: !this.state.showMore,
        })
    }
    submit = () => {
        this.props.onSearch();
    }
    onChange=(key,isSelect,submit)=>(val)=>{
        const {filter} = this.props;
        filter[key] = isSelect ? val : val.target.value;
        this.props.onChange(filter);
        submit && this.submit();
    }
    //支付类型
    onChangePayType = (el) => {
        const {filter} = this.props;
        filter.payType = el.target.value;
        this.props.onChange(filter);
        this.submit();
    }
    //筛选日期
    onChangeDate = (val) => {
        const {filter} = this.props;
        filter.beginTime = val[0].format(formatDate);
        filter.endTime = val[1].format(formatDate);
        this.props.onChange(filter)
    }
    //重置
    resetFilter = () => {
        const {filter} = this.props;
        filter.orderNo = undefined;
        filter.userId = undefined;
        filter.cardAccount = undefined;
        filter.realName = undefined;
        filter.notifyUrl = undefined;
        filter.beginTime = undefined;
        filter.endTime = undefined;
        filter.status = '';
        filter.callbackStatus = '';
        this.props.onChange(filter);
        this.submit();
    }
    render() {
        const {
            filter,
            selectedRowKeys,
            openEditMore,
        } = this.props;

        const {
            orderNo,
            userId,
            beginTime,
            endTime,
            payType,
            cardAccount,
            realName,
            notifyUrl,
            status,
            callbackStatus,
        } = filter;
        const {showMore} = this.state;
        const rangeDate = beginTime && endTime ? [moment(beginTime), moment(endTime)] : [];
        return (
            <>
                <div className='toggle-type' style={{paddingBottom: '15px'}}>
                    <Radio.Group value={payType} onChange={this.onChangePayType}>
                        {
                            Object.keys(PAY_TYPE).map((it,key)=>(
                                <Radio.Button value={it} key={key}>{PAY_TYPE[it]}</Radio.Button>
                            ))
                        }
                    </Radio.Group>
                    <Button style={{marginLeft: '30px'}}
                            onClick={openEditMore}
                            disabled={!selectedRowKeys.length}>批次编辑回调地址</Button>
                </div>
                <Row gutter={18} className='filter-form'>
                    <Col span={8}>
                        <div className='filter-item'>
                            <label>订单编号:</label>
                            <div className='filter-auto'><Input type="text"
                                                                value={orderNo}
                                                                onPressEnter={this.submit}
                                                                onChange={this.onChange('orderNo')}
                                                                placeholder='订单编号'/></div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='filter-item'>
                            <label>　玩家ID:</label>
                            <div className='filter-auto'><Input type="text"
                                                                value={userId}
                                                                onPressEnter={this.submit}
                                                                onChange={this.onChange('userId')}
                                                                placeholder='请输入玩家ID'/></div>
                        </div>
                    </Col>

                    {
                        showMore &&
                        <>
                            <Col span={8}>
                                <div className='filter-item'>
                                    <label>提现账号:</label>
                                    <div className='filter-auto'><Input type="text"
                                                                        value={cardAccount}
                                                                        onPressEnter={this.submit}
                                                                        onChange={this.onChange('cardAccount')}
                                                                        placeholder='请输入提现账号'/></div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='filter-item'>
                                    <label>　　姓名:</label>
                                    <div className='filter-auto'><Input type="text"
                                                                        value={realName}
                                                                        onPressEnter={this.submit}
                                                                        onChange={this.onChange('realName')}
                                                                        placeholder='请输入提现人姓名'/></div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='filter-item'>
                                    <label>回调地址:</label>
                                    <div className='filter-auto'><Input type="text"
                                                                        value={notifyUrl}
                                                                        onPressEnter={this.submit}
                                                                        onChange={this.onChange('notifyUrl')}
                                                                        placeholder='请输入回调地址'/></div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='filter-item'>
                                    <label>时间筛选:</label>
                                    <div className='filter-auto'><RangePicker format="YYYY-MM-DD"
                                                                              allowClear={false}
                                                                              style={{width: '100%'}}
                                                                              value={rangeDate}
                                                                              onChange={this.onChangeDate}/></div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='filter-item'>
                                    <label>提现状态:</label>
                                    <div className='filter-auto'>
                                        <Select value={status}
                                                onChange={this.onChange('status',true)}
                                                style={{ width: '100%' }}>
                                            <Option value="">全部</Option>
                                            {
                                                Object.keys(WITHDRAW_STATUS).map((it,key)=>(
                                                    <Option value={it} key={key}>{WITHDRAW_STATUS[it].text}</Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className='filter-item'>
                                    <label>回调状态:</label>
                                    <div className='filter-auto'>
                                        <Select value={callbackStatus}
                                                onChange={this.onChange('callbackStatus',true)}
                                                style={{ width: '100%' }}>
                                            <Option value="">全部</Option>
                                            {
                                                Object.keys(CALLBACK_STATUS).map((it,key)=>(
                                                    <Option value={it} key={key}>{CALLBACK_STATUS[it].text}</Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                        </>
                    }
                    <Col span={8}>
                        <Button type='primary' onClick={this.submit}>查询</Button>
                        <Button onClick={this.resetFilter} style={{marginLeft: '10px'}}>重置</Button>
                        <a href="javascript:;"
                           onClick={this.toggle}
                           style={{marginLeft: '20px'}}>
                            <span style={{marginRight: '6px'}}>展开筛选</span>
                            {
                                showMore ?
                                    <Icon type="up" /> :
                                    <Icon type="down"/>
                            }
                        </a>
                    </Col>
                </Row>
            </>
        );
    }
}
