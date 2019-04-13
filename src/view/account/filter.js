import React, {Component} from 'react';
import {Row, Col, Input, Button, Select, Icon} from 'antd'
import {ROLE_TYPE} from '@config'
import Create from './create'

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
    onChangeRoleType = (value) => {
        const {filter} = this.props;
        filter.roleType = value;
        this.props.onChange(filter);
        this.submit();
    }
    onChangeUserName = (el) => {
        const {filter} = this.props;
        filter.username = el.target.value;
        this.props.onChange(filter)
    }
    resetFilter = () => {
        const {filter} = this.props;
        filter.username = undefined;
        filter.roleType = '';
        this.props.onChange(filter);
        this.submit();
    }
    //打开创建账号弹窗
    openCreate = () => {
        this.setState({
            visibleCreate: true,
        })
    }

    render() {
        const {
            visibleCreate,
        } = this.state;
        const {
            username,
            roleType,
        } = this.props.filter;
        return (
            <>
                <Row gutter={18} className='filter-form'>
                    <Col span={8}>
                        <div className='filter-item'>
                            <Button type='primary'
                                    style={{marginRight: '30px'}}
                                    onClick={this.openCreate}><Icon type="plus"/> 创建</Button>
                            <label>账号权限:</label>
                            <div className='filter-auto'>
                                <Select value={roleType}
                                        onChange={this.onChangeRoleType}
                                        style={{width: '100%'}}>
                                    <Option value="">全部</Option>
                                    {
                                        Object.keys(ROLE_TYPE).map((it, key) => (
                                            <Option value={it}
                                                    key={key}>{ROLE_TYPE[it]}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='filter-item'>
                            <label>账号:</label>
                            <div className='filter-auto'><Input type="text"
                                                                value={username}
                                                                onPressEnter={this.submit}
                                                                onChange={this.onChangeUserName}
                                                                placeholder='请输入账号名称'/></div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <Button type='primary' onClick={this.submit}>查询</Button>
                        <Button onClick={this.resetFilter} style={{marginLeft: '10px'}}>重置</Button>
                    </Col>
                </Row>
                <Create visible={visibleCreate}
                        onCreated={this.props.onCreated}
                        onCancel={() => this.setState({visibleCreate: false})}/>
            </>
        );
    }
}
