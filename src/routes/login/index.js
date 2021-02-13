import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Image } from 'antd';
import loginImg from '../../assets/login-img.png'
import './login.scss'
import Cookies from 'js-cookie';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../config/api/'

const Login = () => {

  const [userName, setUserName] = useState('test@gmail.com');
  const [password, setPassword] = useState('test@1234');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isEmailId = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const signInClicked = async () => {
    if (!password || !userName) {
      setErrorMsg('UserName/Password cannot be empty')
    }
    else if (!isEmailId(userName)) {
      setErrorMsg('Invalid Email ID')
    }
    else if (password.length <= 5) {
      setErrorMsg('Invalid password length')
    }
    else {
      setIsLoading(true)
      try {
        const response = await axios
          .post('user/login', {
            emailId: userName,
            password: password,
            userType: "Super Admin",
          })
        setIsLoading(false)
        const auth = response.data && response.data.auth
        const user = response.data && response.data.user
        if (auth && user) {
          Cookies.set('accessToken', auth || '');
          Cookies.set('userId', user.userId || '');
          Cookies.set('recId', user.recId || '');
          setTimeout(() => window.location.reload(), 1000)
        } else {
          const errorMsg = response
            && response.data
            && response.data.message
            || 'Something went wrong! Try again'
          setErrorMsg(errorMsg)
        }
      }
      catch (e) {
        setIsLoading(false)
        const errorMsg = e.response
                        && e.response.data
                        && e.response.data.message
                        || 'Something went wrong! Try again'
        setErrorMsg(errorMsg)
      }
    }
  }
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <div className={'login-screen'}>
      <div className={'login-wrapper'}>
        <div className={'login-card'}>
          <Card className={'image-card'} style={{ backgroundColor: '#EFF2F7', border: '0px', boxShadow: '0 0px 12px #d2d2d2' }} >
            <img width={350} src={loginImg} />
          </Card>
          <Card style={{ border: '0px', boxShadow: '0 0px  12px  #d2d2d2' }}>
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}>
              <div className={'login-brand-logo-wrapper'}>
                <h1>GLOWTOX</h1>
              </div>
              <Form.Item
                label="Login"
                name="username"
                rules={[{ message: 'Please input your Username!' }]}>
                <Input
                  size="large"
                  defaultValue={userName}
                  style={{ borderRadius: '5px' }}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  onChange={(e) => {
                    setUserName(e.target.value)
                    setErrorMsg('')
                  }}
                  placeholder="Username" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ message: 'Please input your Password!' }]}
              >
                <Input.Password
                  size="large"
                  style={{ borderRadius: '5px' }}
                  defaultValue={password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrorMsg('')
                  }}
                />
              </Form.Item>
              <div className={'error-msg'}>{errorMsg}</div>
              <Form.Item>
                <Button
                  loading={isLoading}
                  //type={'primary'}
                  type="primary"
                  size="large" className="login-btn" onClick={() => signInClicked()}>
                  Sign in
                  </Button>
              </Form.Item>
              {/* <Form.Item style={{ textAlign: 'center', marginTop: '-10px' }}>
                <a className="login-form-forgot" href="" >
                  Forgot password
                  </a>
              </Form.Item> */}
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default Login