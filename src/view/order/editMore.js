import React, {Component} from 'react';
import {Modal,Form, Input, message} from 'antd'
import {editCallBack} from '@api'

class EditMore extends Component {
    static defaultProps = {
        visible: false,
        data: [],
        onCancel(){},
        onEdited(){},
    }
    state = {
        loading: false,
        orderNoList: []
    }
    static getDerivedStateFromProps(props) {
        props.data.map(it=>it.orderNo)
        return {
            orderNoList: props.data.map(it=>it.orderNo),
        };
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
                await editCallBack(values)
                this.props.onEdited();
                this.handleCancel();
                message.success('编辑成功')
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
    handleCancel = ()=> this.props.onCancel(false);
    render() {
        const {
            form,
            visible,
        } = this.props;
        const {
            loading,
            orderNoList,
        } = this.state;
        const {getFieldDecorator} = form;

        return (
            <Modal
                title="编辑回调地址"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item>
                        {getFieldDecorator('orderNoList', {
                            initialValue: orderNoList
                        })(
                            <Input type='hidden'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="回调地址"
                    >
                        {getFieldDecorator('callbackUrl', {
                            rules: [
                                { required: true, message: '请输入回调地址' },
                            ],
                        })(
                            <Input placeholder='请输入回调地址'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(EditMore)
