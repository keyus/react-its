import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Icon, Avatar, Popover} from 'antd';
import {NavLink} from 'react-router-dom';
import {logout} from '@action/user'
import Router, {Menus} from './router'

const {
    Header, Sider, Content,
} = Layout;
class View extends Component {
    state = {
        visible: false,
        sideVisible: true
    }
    handleVisibleChange = (visible) => {
        this.setState({
            visible
        });
    }
    logout = ()=>{
        this.props.logout();
    }
    toggle = ()=>{
        this.setState({
            sideVisible: !this.state.sideVisible
        })
    }
    get side(){
        if(this.state.sideVisible){
            const {roleType} = this.props.user;
            return (
                <Sider className='view-side' >
                    <div className='view-logo'>
                        <span><Icon type="slack" /> Mis  <em>ITS</em></span>
                    </div>
                    <ul>
                        {
                            Menus.map((it,key)=>(
                                it.role.includes(roleType) &&
                                <li key={key}>
                                    <NavLink to={it.path}
                                             exact={it.exact}>
                                        <Icon type={it.icon} theme="filled" />
                                        {it.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </Sider>
            )
        }
    }
    render() {
        return (
            <Layout className='view-container'>
                {this.side}
                <Layout>
                    <Header className='view-header'>
                        <div className='view-header-left'>
                            <Icon type="menu-fold" onClick={this.toggle}/>
                        </div>
                        <div className='view-user'>
                            <Popover
                                content={
                                    <div className='view-user-popver'>
                                        <p><a onClick={this.logout}><Icon type="export" /> 退出</a></p>
                                    </div>
                                }
                                title={`用户：${this.props.user.username}`}
                                trigger="click"
                                visible={this.state.visible}
                                placement="bottomRight"
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Avatar icon="user" />
                                <Icon type="caret-down" className='xi' />
                            </Popover>
                        </div>
                    </Header>
                    <Content className='view-main'>
                        <div className='view-main-content'><Router/></div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
const mapState =(state)=>{
    return {
        user: state.user
    }
}
const mapDispatch=(dispatch)=>{
    return {
        logout(){
            dispatch(logout())
        }
    }
}
export default connect(mapState,mapDispatch)(View)
