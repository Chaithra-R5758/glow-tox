import { withRouter, } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import brandLogo from '../../assets/brand-logo.png'
import './login.scss'
import Cookies from 'js-cookie';

class Login extends Component {

    signInClicked = () => {
        Cookies.set('accessToken', 'value');
        this.props.history.push('/dashboard')
    }

    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        const onFinish = (values) => {
            console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className={'login-screen'}>
                <div className={'login-wrapper'}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <div className={'login-brand-logo-wrapper'}>
                            <img src={brandLogo} className={'login-brand'} />
                        </div>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}
                        <div className={'login-btn'} onClick={() => this.signInClicked()}>
                                Submit
                            </div>
                    </Form>
                </div>
            </div>
        );
    };
}
export default withRouter(Login)