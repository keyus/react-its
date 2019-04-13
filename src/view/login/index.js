import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {auth} from '@action/user';
import './index.scss'
import {isAuthenticated} from '@com/PrivateRoute'
import {login} from '@api'
import util from '@util'

class Login extends Component {
    state = {
        loading: false,
    }
    componentDidMount() {
        this.checkAuth();
    }
    componentWillUnmount() {
        this.setState = () => {}
    }
    checkAuth = () => {
        if (isAuthenticated()) {
            message.success('已登陆，跳转中...', 1, () => {
                util.goHome();
            })
        }
    }
    submit = () => {
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            this.setState({
                loading: true,
            })
            try {
                const res = await login(values)
                this.props.auth(res.data);
                message.success('登陆成功！')
                util.goHome();
                this.setState({
                    loading: false,
                })
            }catch (e) {
                this.setState({
                    loading: false,
                })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <section className='login-wrapper'>
                <Form className="login-form">
                    <div className='login-logo'>
                        <span><Icon type="slack" /> Mis ITS</span>
                        <small>请登录</small>
                    </div>
                    <div className='login-form-bg'>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       onPressEnter={this.submit}
                                       placeholder="用户名"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       type="password"
                                       onPressEnter={this.submit}
                                       placeholder="密码"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <Button type="primary"
                                    loading={this.state.loading}
                                    onClick={this.submit}
                                    className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth(data) {
            dispatch(auth(data))
        }
    }
}
export default connect(null, mapDispatchToProps)(Form.create(null)(Login));
