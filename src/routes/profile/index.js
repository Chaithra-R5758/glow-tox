import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, Image, Button, Anchor } from 'antd';
import { EditFilled } from '@ant-design/icons'
import { response } from './mock.js'
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};


class Profile extends React.Component {
    constructor() {
        super()
        this.state = {

            profileImg:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        };
    }


    imageHandler = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result });
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    render() {
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
                                            <i type="link" style={{ color: "#343557", fontSize: '1.5em' }}>
                                                {<EditFilled />} </i>
                                        </label>
                                    </div>
                                    <input style={{ display: 'none' }}
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
                                                <Form.Item name='name'
                                                    label="Full Name"
                                                    rules={[{ required: true, message: 'Please input your Username!' }]}>
                                                    <Input
                                                        defaultValue={response.user.userName}
                                                        size="large"
                                                        style={{ borderRadius: '5px' }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="email"
                                                    label="E-mail"
                                                    rules={[
                                                        {
                                                            type: 'email',
                                                            message: 'The input is not valid E-mail!',
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'Please input your E-mail!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        defaultValue={response.user.emailId}
                                                        size="large"
                                                        style={{ borderRadius: '5px' }} />
                                                </Form.Item>
                                                <Form.Item
                                                    name="phone"
                                                    label="Phone Number"
                                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                                >
                                                    <Input
                                                        size="large"
                                                        defaultValue={response.user.phoneNumber}
                                                        style={{ borderRadius: '5px' }}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <div className={'profile-primary-btn'} htmlType="submit" >
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
                                                <Form.Item

                                                    name="password"
                                                    label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password size="large" style={{ borderRadius: '5px' }} />
                                                </Form.Item>
                                                <Form.Item

                                                    name="confirm"
                                                    label="Confirm Password"
                                                    dependencies={['password']}
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('password') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(' two passwords entered do not match!');
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password size="large" style={{ borderRadius: '5px' }} />
                                                </Form.Item>
                                            </Form>
                                        </div>
                                        <div className={'profile-primary-pwd-btn'} htmlType="">
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
