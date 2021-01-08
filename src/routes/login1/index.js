import { withRouter, } from "react-router-dom";
import React, { Component, Suspense } from 'react';
import { Form, Input, Button, Checkbox ,Card,Image} from 'antd';
import brandLogo from '../../assets/brand-logo.png'
import './login.scss'
import Cookies from 'js-cookie';

class Login extends Component {

    signInClicked = () => {
        Cookies.set('accessToken', 'value');
        this.props.history.push('/login1')
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
                <Card style={{width:'400px' ,marginTop:'111px',marginLeft:'290px'}}>
                 <Image 
      width={350} src="https://image.freepik.com/free-vector/vector-illustration-home-office-computer-stationery-items-houseplants-desk_173706-73.jpg"/>
                </Card>
                <div className={'login-wrapper'}>
                    
                    <Form
                    layout="vertical"
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish} >
                          
                        <div className={'login-brand-logo-wrapper'}>
                            <div className={'login-brand'}>
                               <h1>GLOWTOX</h1>
                               </div> 
                        </div>
                        <Form.Item 
                            label="Login"
                            name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        >
                            <Input  placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                             name="password"
                             rules={[{ required: true, message: 'Please input your Password!' }]}
                           >
                             <Input
                               prefix={<LockOutlined className="site-form-item-icon" />}
                               type="password"
                               placeholder="Password"
                             />
                        </Form.Item>

                        <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
                    </Form>
                </div>
            </div>
        );
    };
}
export default withRouter(Login)