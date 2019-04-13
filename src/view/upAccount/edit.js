import React, {Component} from 'react';
import {Modal, Form, Input, message} from 'antd'
import {addIp, deleteIp} from '@api'

class Edit extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
        onEditSuccess(){},
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
            const username = values.username;
            try {
                this.handleCancel();
                message.success(`账号${values.username}的ip修改成功`);
                this.props.onEditSuccess();
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
            data,
        } = this.props;
        const {
            loading,
        } = this.state;
        const {getFieldDecorator} = form;

        return (
            <Modal
                title="编辑上游账号"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue: data.username
                        })(
                            <Input type='hidden'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="上游账号"
                    >
                        <strong>{data.username}</strong>
                    </Form.Item>
                    <Form.Item
                        label="支付权重"
                    >
                        {getFieldDecorator('platform', {
                            initialValue: data.platform,
                            rules: [
                                { required: true, message: '请输入权重值' },
                                { pattern: /^\d+$/, message: '权重值必须为数字' },
                            ],
                        })(
                            <Input placeholder='请输入权重值'/>
                        )}

                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(Edit)
