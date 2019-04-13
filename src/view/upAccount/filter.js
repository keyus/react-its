import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'antd'

export default class Filter extends Component {
    static defaultProps = {
        filter: {},
        onChange(){},
    }
    submit = () => {
        this.props.onSearch();
    }
    onChangeUsername = (el)=>{
        const {filter} = this.props;
        filter.username = el.target.value;
        this.props.onChange(filter)
    }
    resetFilter = () => {
        const {filter} = this.props;
        filter.username = undefined;
        this.props.onChange(filter);
        this.submit();
    }
    render() {
        const {
            username,
        } = this.props.filter;
        return (
            <Row gutter={18} className='filter-form'>
                <Col span={6}>
                    <div className='filter-item'>
                        <label>上游账号</label>
                        <div className='filter-auto'><Input type="text"
                                                            value={username}
                                                            onPressEnter={this.submit}
                                                            onChange={this.onChangeUsername}
                                                            placeholder='请输入账号名称'/></div>
                    </div>
                </Col>
                <Col span={6}>
                    <Button type='primary' onClick={this.submit}>查询</Button>
                    <Button onClick={this.resetFilter} style={{marginLeft: '10px'}}>重置</Button>
                </Col>
            </Row>
        );
    }
}
