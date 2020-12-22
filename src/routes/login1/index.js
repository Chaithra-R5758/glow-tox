import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import brandLogo from '../../assets/brand-logo.png'
import './login.scss'

class Login extends Component {

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

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}

export default (Login)