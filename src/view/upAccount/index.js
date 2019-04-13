import React, {Component} from 'react';
import {Table} from 'antd';
import {upAccount} from '@api';
import columns from './columns'
import Filter from './filter'
import Edit from './edit'
import Pay from './pay'

export default class UpAccount extends Component {
    state = {
        visibleEdit: false,
        visiblePay: false,
        currentItem: {},
        loading: false,
        page: 1,
        size: 10,
        total: 0,
        data: [],
        sorter: {},
        query: {
            username: undefined,
        }
    }

    componentWillUnmount() {
        this.setState = () => {
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            totalPage: Math.ceil(state.total / state.size),
            query: {
                ...state.query,
                page: state.page,
                rows: state.size,
                sortType: state.sorter.order?.replace('end', ''),
                sortField: state.sorter.field,
            }
        };
    }

    componentDidMount() {
        this.fetch();
    }

    tableChange = (pagination, sorter) => {
        this.setState({
            page: pagination.current,
            size: pagination.pageSize,
            sorter,
        }, () => this.fetch());
    }
    onFilterChange = (query) => {
        this.setState({
            query,
        })
    }
    onSearch = () => {
        this.fetch();
    }
    fetch = async () => {
        this.setState({
            loading: true,
        })
        try {
            const res = await upAccount(this.state.query);
            this.setState({
                total: res.total,
                data: res.data,
                loading: false,
            })
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
    //打开编辑弹窗
    openKey = (item) => () => {
        this.setState({
            currentItem: item,
            visibleEdit: true,
        })
    }

    //打开充值弹窗
    openPay = (item) => () => {
        this.setState({
            currentItem: item,
            visiblePay: true,
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
            loading,
            currentItem,
            visibleEdit,
            visiblePay,
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
                       onChange={(p, filters, sorter) => this.tableChange(p, sorter)}
                       pagination={{
                           current: page,
                           pageSize: size,
                           showQuickJumper: true,
                           showSizeChanger: true,
                           total,
                           showTotal(total) {
                               return `共 ${total} 条记录 第 ${page} / ${totalPage || 1} 页`;
                           },
                       }}
                       dataSource={data}/>

                <Edit visible={visibleEdit}
                      data={currentItem}
                      onCancel={() => this.setState({visibleEdit: false})}/>
                <Pay visible={visiblePay}
                     data={currentItem}
                     onCancel={() => this.setState({visiblePay: false})}/>
            </div>
        );
    }
}
