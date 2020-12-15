import React from 'react';
import brandLogo from '../../assets/brand-logo.png'
import './login.scss'
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import Password from 'antd/lib/input/Password';
import axios from '../../config/api/'


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email:'',
      password:'',
      emailError:'',
      passwordError:'',
    }
  }

  signIn = async () => {
    const {email,password} = this.state
    const result = await axios.post('/auth/signin', { email, password })
  }

  checkEmailValidation = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateCredentials = () => {
    const { email, password, passwordError, emailError } = this.state

    if(email === ''){
      this.setState({emailError:'Email cannot be empty'})
    }
    else if(!this.checkEmailValidation(email)){
      this.setState({emailError:'Email is not valid'})
    }
    if(password === ''){
      this.setState({passwordError:'Password cannot be empty'})
    }
    else if(password.length < 4){
      this.setState({passwordError:'Password cannot be less than 8 characters'})
    }
    if(!passwordError && !emailError){
      this.signIn()
    }
  }

  render() {
    const { emailError, passwordError } = this.state

    return (
      <div className={'login-screen'}>
        <div className={'login-wrapper'}>
          <img src={brandLogo} className={'login-brand'} />
          <Space direction="vertical">
            <div className={'login-input-wrapper'}>
              <Input
                size="large"
                placeholder="Email"
                onChange={(event)=>{
                  this.setState({
                    email:event.target.value,
                    emailError:'',
                  })
                }}
              />
              <div className={'field-error'}>{emailError}</div>
            </div>
            <div className={'login-input-wrapper'}>
              <Input.Password
                size="large"
                placeholder="Password"
                onChange={(event)=>{
                  this.setState({
                    password:event.target.value,
                    passwordError:'',
                  })
                }}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <div className={'field-error'}>{passwordError}</div>
            </div>
            <div className={'sign-in-btn'}>
              <Button 
                type="primary" 
                size={'large'}
                onClick={()=>this.validateCredentials()}
                block>
              Sign In
                </Button>
            </div>
          </Space>


        </div>
      </div>
    )
  }
}



export default (Login);
