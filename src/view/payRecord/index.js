import React, {Component} from 'react';
import {Table} from 'antd';
import {payRecord} from '@api';
import columns from './columns'
import Filter from './filter'

export default class PayRecord extends Component {
    state = {
        loading: false,
        visiblePassword: false,
        visibleKey: false,
        visibleCreate: false,
        currentItem: {},
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {
            orderNo: undefined,
            status: '',
            beginTime: undefined,
            endTime: undefined,
        }
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
    static getDerivedStateFromProps(props, state) {
        return {
            totalPage: Math.ceil(state.total / state.size),
            query:{
                ...state.query,
                page: state.page,
                rows: state.size,
            }
        };
    }
    componentDidMount(){
        this.fetch();
    }
    tableChange = (pagination, sorter)=>{
        this.setState({
            page: pagination.current,
            size: pagination.pageSize,
            sorter,
        },()=>this.fetch());
    }
    onFilterChange = (query)=>{
        this.setState({
            query,
        })
    }
    onSearch = ()=>{
        this.fetch();
    }
    fetch = async ()=>{
        this.setState({
            loading: true,
        })
        try {
            const res = await payRecord(this.state.query);
            this.setState({
                total: res.total,
                data: res.data,
                loading: false,
            })
        }catch (e) {
            this.setState({
                loading: false,
            })
        }
    }

    render() {
        const {
            page,
            totalPage,
            total,
            size,
            data,
            query,
            loading,
        } = this.state;
        return (
            <div>
                <Filter onSearch={this.onSearch}
                        onChange={this.onFilterChange}
                        filter={query}/>
                <Table columns={columns(this)}
                       loading={loading}
                       rowKey={(item, index) => index}
                       locale={{emptyText: '无任何记录'}}
                       onChange={(p,filters,sorter) => this.tableChange(p,sorter)}
                       pagination={{
                           current: page,
                           pageSize: size,
                           showQuickJumper: true,
                           showSizeChanger: true,
                           total,
                           showTotal(total){
                               return `共 ${total} 条记录 第 ${page} / ${totalPage || 1} 页`;
                           },
                       }}
                       dataSource={data}/>

            </div>
        );
    }
}
