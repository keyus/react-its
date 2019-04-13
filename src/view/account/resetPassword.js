import React, {Component} from 'react';
import {Modal,Form, Input, message} from 'antd'
import {resetPassword} from '@api'

class ResetPassword extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
    }
    state = {
        loading: false,
        confirmDirty: false,
    }
    componentWillUnmount() {
        this.setState = () => {}
    }
    submit = ()=>{
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            this.setState({
                loading: true,
            })
            try {
                await resetPassword(values)
                message.success('重置密码成功！')
                this.setState({
                    loading: false,
                })
                this.handleCancel();
            }catch (e) {
                this.setState({
                    loading: false,
                })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('再次输入新密码不一致');
        } else {
            callback();
        }
    }

    handleCancel = ()=>{
        this.props.onCancel(false);
    }
    render() {
        const {
            form,
            visible,
            data,
        } = this.props;
        const {
            loading,
        } = this.state;
        const {getFieldDecorator} = form;

        return (
            <Modal
                title="重置密码"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item>
                        {getFieldDecorator('id', {
                            initialValue: data.id
                        })(
                            <Input type='hidden'/>
                        )}
                    </Form.Item>
                    <Form.Item label="账号">
                        <strong>{data.username}</strong>
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入新密码' },
                                { min: 6, max: 20, message: '新密码长度6-20位' },
                                { validator: this.validateToNextPassword}
                            ],
                        })(
                            <Input placeholder='请输入新密码' maxLength={20} type='password'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="确认新密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [
                                { required: true, message: '请再次输入新密码'},
                                { validator: this.compareToFirstPassword }
                            ],
                        })(
                            <Input placeholder='请再次输入新密码' onBlur={this.handleConfirmBlur} maxLength={20} type='password'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(ResetPassword)
