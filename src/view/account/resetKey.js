import React, {Component} from 'react';
import {Modal,Form, Input} from 'antd'

class ResetKey extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
    }
    state = {
        loading: false,
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
                const res = await login(values)
                this.props.auth(res.data)
                this.props.history.push('/');
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
    handleCancel = ()=>{
        this.props.onCancel(false);
    }
    render() {
        const {
            form,
            visible,
        } = this.props;
        const {
            loading,
        } = this.state;
        const {getFieldDecorator} = form;

        return (
            <Modal
                title="重置密匙"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item
                        label="新密匙"
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入新密匙' }],
                        })(
                            <Input placeholder='请输入新密匙'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="确认新密匙"
                    >
                        {getFieldDecorator('password2', {
                            rules: [{ required: true, message: '请再次输入新密匙' }],
                        })(
                            <Input placeholder='请再次输入新密匙'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(ResetKey)
