import React, {Component} from 'react';
import {Modal,Form, Input, Button, Popconfirm, message} from 'antd'
import {resetKey} from '@api'

class ResetKey extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
    }
    state = {
        refresh: false,
    }
    componentWillUnmount() {
        this.setState = () => {}
    }
    submit = ()=>{
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            try {
                const res = await resetKey(values);
                this.props.data.key = res.data;
                message.success('重置成功')
                this.setState({
                    refresh: !this.state.refresh
                })
            }catch (e) {
                console.warn(e)
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
                title="重置密匙"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                footer={null}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item>
                        {getFieldDecorator('mid', {
                            initialValue: data.mid
                        })(
                            <Input type='hidden'/>
                        )}
                    </Form.Item>
                    <Form.Item label="商户名称">
                        <strong>{data.merchantName}</strong>
                    </Form.Item>
                    <Form.Item label="原密匙">
                        <div className='key-rows'>
                            <strong>{data.key}</strong>
                            <div className='key-refresh'>
                                <Popconfirm placement="topRight" title='确认重置此商户密匙?' onConfirm={this.submit} okText="确认" cancelText="取消">
                                    <Button type="primary"
                                            shape="circle"
                                            icon="sync"
                                            size='large' />
                                </Popconfirm>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(ResetKey)
