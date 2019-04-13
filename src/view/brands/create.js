import React, {Component} from 'react';
import {Modal,Form, Input} from 'antd'
import {addMerchant} from '@api'

class Create extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
        onCreated(){},          //添加成功后回调
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
                await addMerchant(values);
                this.props.onCreated();
                this.props.onCancel();
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
                title="创建商户"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item
                        label="商户名称"
                    >
                        {getFieldDecorator('merchantName', {
                            rules: [{ required: true, message: '请输入商户名称' }],
                        })(
                            <Input placeholder='请输入商户名称'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(Create)
