import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, Image, Button, Anchor } from 'antd';
import { EditFilled } from '@ant-design/icons'
import { response } from './mock.js'
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
};
const { Option } = Select;

class Profile extends React.Component {
    state = {
        profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    };
      
      imageHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.setState({ profileImg: reader.result });
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      };
     render(){
      const { profileImg } = this.state;
    return (
        <div className="profile-screen">
            <div>
                <div className={'content-wrapper'}>
                    <PageTitle
                        title={'Profile'}
                    />
                    <div className={'content-body-wrapper'}>
                        <div className={'profile-card'} >
                            <Card >
                                <div className={'title-card'}>
                                    Personal Profile 
                           </div>
                                <div className={'img-card'}>
                                    <img alt="" id="img" src={profileImg}
                                        className={'profile-img'} />
                                </div>
                                <div className="edit-btn-card">
                                <label className htmlFor="input">
                                    <i type="link"  style={{ color: "#343557", fontSize: '1.5em' }}>
                    {<EditFilled/>} </i> 
                    </label>   
                                </div>
                                <input style={{display:'none'}}
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
          />
                  
                                <Space direction="vertical">
                                    <div className="profile-card-body" >
                                        <Form
                                            layout="vertical"
                                            name="nest-profile" >
                                            <Form.Item name={['user', 'name']} label="Full Name" >
                                                <Input 
                                                    value={response.user.userName}
                                                    size="large" 
                                                    style={{ borderRadius: '5px' }} 
                                                />
                                            </Form.Item>
                                            <Form.Item name={['user', 'email']} label="Email Id"
                                                rules={[{ type: 'email' }]}>
                                                <Input 
                                                    value={response.user.emailId}
                                                    size="large" 
                                                    style={{ borderRadius: '5px' }} />
                                            </Form.Item>
                                            <Form.Item name={['user', 'phone']} label="Phone Number"
                                                rules={[{ type: 'phoneNum' }]}>
                                                <Input 
                                                    size="large" 
                                                    style={{ borderRadius: '5px' }} 
                                                    value={response.user.phoneNumber}
                                                />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className={'profile-primary-btn'} >
                                        Submit
                                    </div>
                                </Space>
                            </Card>
                        </div>
                        <div className={'profile-card-pwd'}>
                            <Card>
                                <div className={'title-card'}>
                                    Change Password
                           </div>
                                <Space direction="vertical" >
                                    <div className={'pwd-card-body'}  >
                                        <Form
                                            layout="vertical"
                                            name="nest-profile"  >
                                            <Form.Item name={['user', 'password']} label="Password"
                                                rules={[{ type: 'password' }]}  >
                                                <Input.Password size="large" style={{ borderRadius: '5px' }} />
                                            </Form.Item>
                                            <Form.Item name={['user', 'Confirm']} label="Re-type Password"
                                                rules={[{ type: 'password' }]}>
                                                <Input.Password size="large" style={{ borderRadius: '5px' }} />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className={'profile-primary-pwd-btn'} >
                                        Submit
                                    </div>
                                </Space>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}
export default withRouter(Profile);
