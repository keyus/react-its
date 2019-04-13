import React, {Component} from 'react';
import {Table, message} from 'antd';
import {ipList} from '@api';
import util from '@util';
import columns from './columns'
import Filter from './filter'
import Edit from './edit'

export default class Ip extends Component {
    state = {
        visibleEdit: false,
        loading: false,
        currentItem: {},
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {
            username: undefined,
            ip: undefined,
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
        const {ip} = this.state.query;
        if(ip && !util.isIp(ip)){
            message.warning('ip格式有误')
            return ;
        }
        this.fetch();
    }
    fetch = async ()=>{
        this.setState({
            loading: true,
        })
        try {
            const res = await ipList(this.state.query);
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
    //打开编辑弹窗
    openEdit=(item)=>()=>{
        this.setState({
            currentItem: item,
            visibleEdit: true,
        })
    }

    render() {
        const {
            query,
            page,
            totalPage,
            total,
            size,
            data,
            currentItem,
            loading,
            visibleEdit,
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

                <Edit visible={visibleEdit}
                      data={currentItem}
                      onEditSuccess={this.fetch}
                      onCancel={()=>this.setState({ visibleEdit: false })}/>
            </div>
        );
    }
}
