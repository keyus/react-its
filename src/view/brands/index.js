import React, {Component} from 'react';
import {Table, Modal} from 'antd';
import {brandList, deleteMerchant} from '@api';
import columns from './columns'
import Filter from './filter'
import ResetKey from './resetKey'

const confirm = Modal.confirm;
export default class Brands extends Component {
    state = {
        loading: false,
        visibleKey: false,
        currentItem: {},
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {
            merchantName: undefined,        //账号
            isBindAccount: '',              //是否绑定账号
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
            const res = await brandList(this.state.query);
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

    //当创建成功
    onCreated=()=>{
        this.setState({
            page: 1,
            query: {
                merchantName: undefined,
            }
        },()=>this.fetch())
    }

    //删除商户
    deleteItem=(item)=>()=>{
        confirm({
            title: `确认删除 ${item.merchantName} ?`,
            onOk: async ()=>{
                try {
                    await deleteMerchant({mid: item.mid});
                    this.fetch();
                }catch (e) {
                    console.warn(e)
                }
            },
        })
    }

    //打开重置密匙弹窗
    openKey=(item)=>()=>{
        this.setState({
            currentItem: item,
            visibleKey: true,
        })
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
            visibleKey,
            currentItem,
        } = this.state;
        return (
            <div>
                <Filter onSearch={this.onSearch}
                        onChange={this.onFilterChange}
                        onCreated={this.onCreated}
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

                <ResetKey visible={visibleKey}
                               data={currentItem}
                               onCancel={()=>this.setState({ visibleKey: false })}/>

            </div>
        );
    }
}
