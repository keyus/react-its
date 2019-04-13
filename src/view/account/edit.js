import React, {Component} from 'react';
import {Modal,Form, Input, message, Tag} from 'antd'
import MidList from '@com/MidList'
import {unbindMerchant, bindMerchant} from '@api'

class Edit extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
        onEditSuccess(){},
    }
    state = {
        loading: false,
        triggerUpdate: false,           //更新商户列表
    }

    componentWillUnmount() {
        this.setState = () => {}
    }
    triggerUpdateChange=(val)=>{
        this.setState({
            triggerUpdate: val,
        })
    }
    unbind = (item)=> async ()=>{
        const {data} = this.props;
        try {
            await unbindMerchant({
                accountId: data.id,
                mid: item.mid,
            })
            this.props.onEdited();
            this.setState({
                triggerUpdate: true,
            })
        }catch (e) {
            console.warn(e)
        }
    }
    submit = ()=>{
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            this.setState({
                loading: true,
            })
            try {
                await bindMerchant(values);
                this.props.onEdited();
                this.handleCancel();
                message.success('修改成功')
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
            triggerUpdate,
        } = this.state;
        const {getFieldDecorator} = form;

        return (
            <Modal
                title="编辑账号"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item>
                        {getFieldDecorator('accountId', {
                            initialValue: data.id
                        })(
                            <Input type='hidden'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="商户账号"
                    >
                        <strong>{data.username}</strong>
                    </Form.Item>
                    <Form.Item
                        label="商户"
                    >
                        <div>
                            {!data.merchantList?.length && '暂无绑定商户账号'}
                            {
                                data.merchantList?.map((it,key)=>(
                                    <Tag closable key={key} onClose={this.unbind(it)}>{it.merchantName}</Tag>
                                ))
                            }
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="新增商户"
                    >
                        {getFieldDecorator('midList', {
                            initialValue: [],
                        })(
                            <MidList triggerUpdate={triggerUpdate} triggerUpdateChange={this.triggerUpdateChange} />
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(Edit)
