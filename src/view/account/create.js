import React, {Component} from 'react';
import {Modal,Form, Input, Select, message} from 'antd'
import {ROLE_TYPE} from '@config'
import MidList from '@com/MidList'
import {createAccount} from '@api'
import util from '@util'
const Option = Select.Option;

class Create extends Component {
    static defaultProps = {
        visible: false,
        data: {},
        onCancel(){},
    }
    state = {
        loading: false,
        roleType: 2,
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
                await createAccount(values)
                this.props.onCreated();
                this.handleCancel();
                message.success('账号创建成功!')
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

    onChangeRoleType=(roleType)=>{
        this.setState({
            roleType: Number(roleType),
        })
    }

    render() {
        const {
            form,
            visible,
        } = this.props;

        const {
            loading,
            roleType,
        } = this.state;

        const {getFieldDecorator} = form;
        const roleList = {...ROLE_TYPE};
        delete roleList[1]                  //不能添加管理角色
        return (
            <Modal
                title="创建新账号"
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                onOk={this.submit}
                onCancel={this.handleCancel}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                    <Form.Item
                        label="账号权限"
                    >
                        {getFieldDecorator('roleType', {
                            rules: [{ required: true, message:  '请选择账号权限'}],
                        })(
                            <Select placeholder="请选择账号权限"
                                    onChange={this.onChangeRoleType}
                                    style={{width: '100%'}}>
                                {
                                    Object.keys(roleList).map((it, key) => (
                                        <Option value={it}
                                                key={key}>{roleList[it]}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </Form.Item>
                    {
                        roleType === 2 &&
                        <Form.Item
                            label="商户"
                        >
                            {getFieldDecorator('midList', {
                                initialValue: [],
                            })(
                                <MidList />
                            )}
                        </Form.Item>
                    }
                    <Form.Item
                        label="账号"
                    >
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '请输入账号' },
                                { pattern: util.reg.account, message: '账号长度4-20个字符' },
                            ],
                        })(
                            <Input placeholder='请输入账号'/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入密码' },
                                { pattern: util.reg.password, message: '密码长度6-20个字符' },
                            ],
                        })(
                            <Input placeholder='请输入密码' type='password'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default Form.create(null)(Create)
