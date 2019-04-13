import React, {Component} from 'react';
import {Modal, Form, Input, Select, message} from 'antd'
import util from '@util'
import bank from '@util/bank'
import {gateway} from '@api'

const { TextArea } = Input;
const Option = Select.Option;
class Pay extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
    }
    payform = React.createRef();
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
            values.money = Number(values.money) * 100;
            try {
                const res = await gateway(values);
                message.loading('充值跳转中...', 1)
                    .then(() => {
                        this.handleCancel();
                        this.payform.current.innerHTML = res.data;
                        document.querySelector('#payform').submit();
                        this.setState({
                            loading: false,
                        })
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
                title="充值"
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
                    <Form.Item
                        label="充值账号"
                    >
                        <strong>{data.username}</strong>
                    </Form.Item>
                    <Form.Item
                        label="充值金额"
                    >
                        {getFieldDecorator('money', {
                            rules: [
                                { required: true, message: '请输入充值金额' },
                                { pattern: util.reg.money, message: '充值金额必须为大于1的整数金额' },
                            ],
                        })(
                            <Input prefix='￥'
                                   maxLength={9}
                                   placeholder='请输入充值金额'/>
                        )}

                    </Form.Item>
                    <Form.Item
                        label="付款银行"
                    >
                        {getFieldDecorator('bankCode', {
                            initialValue: undefined,
                            rules: [
                                { required: true, message: '请选择付款银行' },
                            ],
                        })(
                            <Select placeholder="请选择付款银行"
                                    style={{width: '100%'}}>
                                {
                                    bank.map((it, key) => (
                                        <Option value={it.bankCode}
                                                key={key}>{it.bankName}</Option>
                                    ))
                                }
                            </Select>
                        )}

                    </Form.Item>
                    <Form.Item
                        label="备注"
                    >
                        {getFieldDecorator('returnInfo', {
                            initialValue: undefined,
                        })(
                            <TextArea rows={4} />
                        )}

                    </Form.Item>
                </Form>

                <div ref={this.payform}/>
            </Modal>
        )
    }
}
export default Form.create(null)(Pay)
