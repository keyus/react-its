import React, {Component} from 'react';
import {Row, Col, Input, Button, Select, DatePicker} from 'antd'
import {PAY_STATUS} from '@config'
import moment from "moment";

const formatDate = 'YYYY-MM-DD HH:mm:ss';
const {RangePicker} = DatePicker;
const Option = Select.Option;
export default class Filter extends Component {
    static defaultProps = {
        filter: {},
        onChange() {
        },
    }
    state = {
        visibleCreate: false
    }
    submit = () => {
        this.props.onSearch();
    }
    onChangeOrderNo = (el) => {
        const {filter} = this.props;
        filter.orderNo = el.target.value;
        this.props.onChange(filter);
    }
    onChangeStatus = (value) => {
        const {filter} = this.props;
        filter.status = value;
        this.props.onChange(filter);
    }
    //筛选日期
    onChangeDate = (val) => {
        const {filter} = this.props;
        filter.beginTime = val[0].format(formatDate);
        filter.endTime = val[1].format(formatDate);
        this.props.onChange(filter)
    }
    resetFilter = () => {
        const {filter} = this.props;
        filter.orderNo = undefined;
        filter.status = '';
        filter.beginTime = undefined;
        filter.endTime = undefined;
        this.props.onChange(filter);
        this.submit();
    }

    render() {
        const {} = this.state;
        const {
            orderNo,
            status,
            beginTime,
            endTime,
        } = this.props.filter;

        const rangeDate = beginTime && endTime ? [moment(beginTime), moment(endTime)] : [];

        return (
            <>
                <Row gutter={18} className='filter-form'>
                    <Col span={8}>
                        <div className='filter-item'>
                            <label>订单号码:</label>
                            <div className='filter-auto'><Input type="text"
                                                                value={orderNo}
                                                                onPressEnter={this.submit}
                                                                onChange={this.onChangeOrderNo}
                                                                placeholder='请输入充值订单号'/></div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='filter-item'>
                            <label>订单状态:</label>
                            <div className='filter-auto'>
                                <Select value={status}
                                        onChange={this.onChangeStatus}
                                        style={{width: '100%'}}>
                                    <Option value="">全部</Option>
                                    {
                                        Object.keys(PAY_STATUS).map((it, key) => (
                                            <Option value={it}
                                                    key={key}>{PAY_STATUS[it].text}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='filter-item'>
                            <div className='filter-auto'>
                                <Button type='primary' onClick={this.submit}>查询</Button>
                                <Button onClick={this.resetFilter} style={{marginLeft: '10px'}}>重置</Button>
                            </div>
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
                </Row>

            </>
        );
    }
}
