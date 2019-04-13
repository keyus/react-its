import React, {Component} from 'react';
import {Table, Modal} from 'antd';
import {accoutList} from '@api';
import columns from './columns'
import Filter from './filter'
import ResetPassword from './resetPassword'
import ResetKey from './resetKey'
import Edit from './edit'
import util from '@util'

/**
 * 权限：
 * 搜索功能     角色[3]
 * 编辑功能     角色[3]
 * @type {ModalFunc}
 */

const confirm = Modal.confirm;
export default class Account extends Component {
    state = {
        loading: false,
        visiblePassword: false,
        visibleKey: false,
        visibleEdit: false,
        currentItem: {},
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {
            roleType: '',               //账号权限
            username: undefined,        //账号
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
    onSearch = ()=>this.fetch();
    fetch = async ()=>{
        this.setState({
            loading: true,
        })
        try {
            const res = await accoutList(this.state.query);
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

    //删除账号
    deleteAccount=(item)=>()=>{
        confirm({
            title: `确认删除 ${item.username} 账号?`,
            onOk() {

            },
        })
    }

    //打开重置密码弹窗
    openPassword=(item)=>()=>{
        this.setState({
            currentItem: item,
            visiblePassword: true,
        })
    }
    //打开重置密匙弹窗
    openKey=(item)=>()=>{
        this.setState({
            currentItem: item,
            visibleKey: true,
        })
    }
    //打开编辑弹窗
    openEdit=(item)=>()=>{
        this.setState({
            currentItem: item,
            visibleEdit: true,
        })
    }

    //创建成功后刷新
    onCreated=()=>{
        this.setState({
            page: 1,
            query:{
                roleType: '',
                username: undefined,
            }
        },()=>this.fetch())
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
            visiblePassword,
            visibleKey,
            visibleEdit,
            currentItem,
        } = this.state;

        return (
            <div>
                {
                    util.getRole() === 3 &&
                    <Filter onSearch={this.onSearch}
                            onChange={this.onFilterChange}
                            onCreated={this.onCreated}
                            filter={query}/>
                }
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
                <ResetPassword visible={visiblePassword}
                               data={currentItem}
                               onCancel={()=>this.setState({ visiblePassword: false })}/>
                <ResetKey visible={visibleKey}
                               data={currentItem}
                               onCancel={()=>this.setState({ visibleKey: false })}/>
                <Edit visible={visibleEdit}
                      data={currentItem}
                      onEdited={this.fetch}
                      onCancel={()=>this.setState({ visibleEdit: false })}/>

            </div>
        );
    }
}
