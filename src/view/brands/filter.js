import React, {Component} from 'react';
import {Row, Col, Input, Button, Icon, Select} from 'antd'
import Create from './create'

const {Option} = Select;
export default class Filter extends Component {
    static defaultProps = {
        filter: {},
        onChange() {},
        onCreated() {},
    }
    state = {
        visibleCreate: false
    }
    submit = () => {
        this.props.onSearch();
    }
    onChangeMerchantName = (el) => {
        const {filter} = this.props;
        filter.merchantName = el.target.value;
        this.props.onChange(filter)
    }
    onChangeBindType = (val) => {
        const {filter} = this.props;
        filter.isBindAccount = val;
        this.props.onChange(filter)
        this.submit();
    }
    resetFilter = () => {
        const {filter} = this.props;
        filter.merchantName = undefined;
        filter.isBindAccount = undefined;
        this.props.onChange(filter);
        this.submit();
    }
    //打开创建账号弹窗
    openCreate = () => {
        this.setState({
            visibleCreate: true,
        })
    }

    onCreated = ()=>{
        this.props.onCreated();
    }

    render() {
        const {
            visibleCreate,
        } = this.state;
        const {
            merchantName,
            isBindAccount,
        } = this.props.filter;
        return (
            <>
                <Row gutter={18} className='filter-form'>

                    <Col span={8}>
                        <div className='filter-item'>
                            <Button type='primary'
                                    style={{marginRight: '30px'}}
                                    onClick={this.openCreate}><Icon type="plus"/> 创建</Button>
                            <label>类型:</label>
                            <div className='filter-auto'>
                                <Select value={isBindAccount}
                                        onChange={this.onChangeBindType}
                                        style={{width: '100%'}}>
                                    <Option value="">全部</Option>
                                    <Option value={1}>未绑定</Option>
                                    <Option value={0}>已绑定账号</Option>
                                </Select>

                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='filter-item'>
                            <label>商户:</label>
                            <div className='filter-auto'>
                                <Input type="text"
                                       value={merchantName}
                                       onPressEnter={this.submit}
                                       onChange={this.onChangeMerchantName}
                                       placeholder='请输入商户名称'/>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <Button type='primary' onClick={this.submit}>查询</Button>
                        <Button onClick={this.resetFilter} style={{marginLeft: '10px'}}>重置</Button>
                    </Col>
                </Row>
                <Create visible={visibleCreate}
                        onCreated={this.onCreated}
                        onCancel={() => this.setState({visibleCreate: false})}/>
            </>
        );
    }
}
