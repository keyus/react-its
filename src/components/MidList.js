import React, {Component} from 'react';
import {Select} from 'antd'
import {brandList} from '@api'

const Option = Select.Option;
export default class MidList extends Component {
    static defaultProps = {
        isBindAccount: 1,
        triggerUpdate: false,
        triggerUpdateChange(){},
        onChange(){},
    }
    state= {
        loading: true,
        data: [],
        page: 1,
        rows: 100,
        total: 0,
    }
    componentDidMount(){
        this.fetch();
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.triggerUpdate){
            this.props.triggerUpdateChange(false);
            this.setState({
                data: [],
                loading: true,
                page: 1,
                total: 0,
            },()=>this.fetch())
        }
    }
    fetch = async ()=>{
        try{
            const res = await brandList({
                isBindAccount: this.props.isBindAccount,
                page: this.state.page,
                rows: this.state.rows,
            });
            const data = this.state.data.concat(res.data)
            this.setState({
                data,
                total: res.total,
                loading: false,
            })
        }catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
    onChange =(value)=>{
        this.props.onChange(value)
    }
    onPopupScroll=({target})=>{
        if(target.scrollTop + target.clientHeight >= target.scrollHeight){
            if(this.state.data.length === this.state.total) return ;
            this.setState({
                loading: true,
                page: this.state.page + 1,
            },()=>this.fetch())
        }
    }
    render() {
        const {
            loading,
            data,
        } = this.state;

        const {
            value,
        } = this.props;

        return (
            <Select mode="multiple"
                    loading={loading}
                    value={value}
                    placeholder="请选择商户"
                    onChange={this.onChange}
                    onPopupScroll={this.onPopupScroll}
                    style={{width: '100%'}}>
                {
                    data.map((it,key)=><Option value={it.mid} key={key}>{it.merchantName || '未知'}</Option>)
                }
            </Select>
        )
    }
}
