import { withRouter, } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import { Form, Input, Button, Checkbox, Card, Image } from 'antd';
import loginImg from '../../assets/login-img.png'
import './login2.scss'
import Cookies from 'js-cookie';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../config/api/'


class Login extends Component {

  constructor(){
    super();
    this.state = {
      password:'',
      email:'',
      errorMsg:'',
    }
  }
  isEmailId = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signInClicked = async () => {
    
  //  this.props.history.push('/dashboard')
  //  window.location.reload();
    const { password, userName } = this.state

    if(!password || !userName){
      this.setState({errorMsg: 'UserName/Password cannot be empty'})
    }
    else if(!this.isEmailId(userName)){
      this.setState({errorMsg: 'Invalid Email ID'})
    }
    else if(password.length <= 4){
      this.setState({errorMsg: 'Invalid password length'})
    }


    

    const result = await axios.post('/login', {
                        "emailId": userName,
                        "password" : password,
                        "userType": "Super Admin",
                    })
                    
    Cookies.set('accessToken', 'value');
    this.setState({
      errorMsg:result.data.message
    })
                    

                  
    // debugger

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
    const onFinish = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const { errorMsg } = this.state
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
                  rules={[{ message: 'Please input your Username!' }]}>
                  <Input 
                    size="large" 
                    style={{ borderRadius: '5px' }}
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    onChange={(e) => this.setState({userName: e.target.value})}
                    placeholder="Username" />
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
                    onChange={(e) => this.setState({password: e.target.value})}
                  />
                </Form.Item>
                <div className={'error-msg'}>{errorMsg}</div>
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