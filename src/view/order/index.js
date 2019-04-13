import React, {Component} from 'react';
import {Table, message} from 'antd';
import {playOrderList, orderCallBack} from '@api';
import columns from './columns'
import Filter from './filter'
import Edit from './edit'
import EditMore from './editMore'

export default class Order extends Component {
    state = {
        loading: false,
        visibleEdit: false,
        visibleEditMore: false,
        currentItem: {},
        selectedRowKeys: [],
        selectData: [],
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {
            orderNo: undefined,        //订单号
            userId: undefined,         //玩家ID
            cardAccount: undefined,    //提现账号
            realName: undefined,       //真实姓名
            notifyUrl: undefined,      //回调地址
            beginTime: undefined,
            endTime: undefined,
            status: '',                //提现状态
            callbackStatus: '',        //回调状态

            payType: '1',              //1、银行卡  2、支付宝
            sortType: undefined,       //排序方式 asc | desc
            sortField: undefined,      //排序字段
            page: 0,
            rows: 0,
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
                sortType: state.sorter.order?.replace('end',''),
                sortField: state.sorter.field,
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
    onFilterChange = (query)=>this.setState({query});
    onSelectChange=(selectedRowKeys,selectData)=> this.setState({ selectedRowKeys, selectData });
    onSearch = ()=>this.fetch();
    fetch = async ()=>{
        this.setState({
            loading: true,
        })
        try {
            const res = await playOrderList(this.state.query);
            this.setState({
                total: res.total,
                data: res.data,
                loading: false,
                selectedRowKeys: [],
            })
        }catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
    //处理订单回调
    orderCallBack=(item)=>async ()=>{
        try {
            await orderCallBack({
                orderNoList: [item.orderNo],
                payType: item.payType
            })
            message.success(`订单编号${item.orderNo} 回调成功`)
        }catch (e) {}
    }
    //打开编辑
    openEdit=(item)=>()=>{
        this.setState({
            currentItem: item,
            visibleEdit: true,
        })
    }
    //打开编辑多个
    openEditMore=()=>this.setState({ visibleEditMore: true });
    render() {
        const {
            query,
            page,
            totalPage,
            total,
            size,
            data,
            loading,
            visibleEdit,
            visibleEditMore,
            currentItem,
            selectData,
            selectedRowKeys,
        } = this.state;
        const column = columns(this);
        const x = column.reduce((a,b)=> {
            if(a?.width){
                return parseInt(a.width) + parseInt(b.width)
            }
            return a + parseInt(b.width)
        })
        return (
            <div>
                <Filter onSearch={this.onSearch}
                        onChange={this.onFilterChange}
                        selectedRowKeys={selectedRowKeys}
                        openEditMore={this.openEditMore}
                        filter={query}/>

                <Table columns={column}
                       rowSelection={{
                           onChange: this.onSelectChange,
                           selectedRowKeys,
                       }}
                       loading={loading}
                       scroll={{x}}
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
                      onEdited={this.fetch}
                      onCancel={()=>this.setState({ visibleEdit: false })}/>
                <EditMore visible={visibleEditMore}
                      data={selectData}
                      onEdited={this.fetch}
                      onCancel={()=>this.setState({ visibleEditMore: false })}/>
            </div>
        );
    }
}
