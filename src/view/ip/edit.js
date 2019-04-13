import React, {Component} from 'react';
import {Modal,Form, Select, Input, message} from 'antd'
import {ROLE_TYPE} from '@config'
import util from '@util'
import {addIp, deleteIp} from '@api'

const Option = Select.Option;
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
    //校对，新增，删除的IP，分别调用新增API，删除API ----无语
    compareIps = (ipsNew)=>{
        const {ips} = this.props.data;
        const addIp = [];
        const deleteIp = [];
        ips.forEach(it=>{
            const has = ipsNew.includes(it);
            if(!has){
                deleteIp.push(it);
            }
        })
        ipsNew.forEach(it=>{
            const has = ips.includes(it);
            if(!has){
                addIp.push(it);
            }
        })
        return [
            addIp,
            deleteIp,
        ]
    }
    submit = ()=>{
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            this.setState({
                loading: true,
            })
            const username = values.username;
            const [addIps, deleteIps] = this.compareIps(values.ips);
            try {
                addIps.length && await addIp({ ips: addIps, username});
                deleteIps.length && await deleteIp({ ips: deleteIps, username});
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
    validateIp = (rule, value, callback)=>{
        if (value?.length) {
            let error = false;
            value.forEach(it=>{
                if(!util.isIp(it)) error = true;
            })
            if(error){
                callback('IP地址输入有误');
            }else{
                callback();
            }
        }else{
            callback();
        }
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
                title="IP白名单编辑"
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
                        label="商户账号"
                    >
                        <strong>{data.username}</strong>
                    </Form.Item>
                    <Form.Item
                        label="Ip白名单"
                    >
                        {getFieldDecorator('ips', {
                            initialValue: data.ips,
                            rules: [
                                { validator: this.validateIp}
                            ],
                        })(
                            <Select
                                mode="tags"
                                placeholder="请输入IP地址"
                                style={{ width: '100%' }}
                                open={false}
                                tokenSeparators={[',']}
                            >
                                {
                                    data.ips?.map((it,key)=>(<Option key={key}>{it}</Option>))
                                }
                            </Select>
                        )}

                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(Edit)
