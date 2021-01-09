import { withRouter, } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import { Form, Input, Button, Checkbox, Card, Image } from 'antd';
import loginImg from '../../assets/login-img.png'
import './login2.scss'
import Cookies from 'js-cookie';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component {

  signInClicked = () => {
    Cookies.set('accessToken', 'value');
    this.props.history.push('/dashboard')
    window.location.reload();
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
          <div className={'login-card'}>
            <Card className={'image-card'} style={{ backgroundColor: '#EFF2F7', border: '0px', boxShadow: '0 0px 12px #d2d2d2' }} >
              <Image width={350} src={loginImg} />
            </Card>
            <Card style={{ border: '0px', boxShadow: '0 0px  12px  #d2d2d2' }}>
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish} >

                <div className={'login-brand-logo-wrapper'}>
                  <h1>GLOWTOX</h1>
                </div>
                <Form.Item
                  label="Login"
                  name="username"
                  rules={[{ message: 'Please input your Username!' }]}
                >
                  <Input size="large" style={{ borderRadius: '5px' }}
                    prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ message: 'Please input your Password!' }]}
                >
                  <Input size="large" style={{ borderRadius: '5px' }}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button size="large" block className="login-btn" onClick={() => this.signInClicked()}>
                    Sign in
                  </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center', marginTop: '-10px' }}>
                  <a className="login-form-forgot" href="" >
                    Forgot password
                  </a>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>

      </div>
    );
  };
}
export default withRouter(Login)