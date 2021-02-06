import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, message, Skeleton, Button } from 'antd';
import { EditFilled } from '@ant-design/icons'
import axios from '../../config/api/'
import toBase64 from "../../utils/base64"
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { getUserId } from '../../config/helpers'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const success = () => {
    message.success('Updated Successfully');
};

const error = () => {
    message.error('Error while Updating!');
};

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            submitLoading: false,
            saveLoading: false,
            isChangePasswordLoading: false,
            loading: false,
            isError: false,
            userDetails: {},
            profile: {},
            profilePic: '',
            password: {},
        };
    }


    async componentDidMount() {
        this.setState({ loading: true })
        try {
            const { data } = await axios.get('admin')
            this.setState({
                loading: false
            })
            const userDetails = (data && data.user) || ''
            if (userDetails)
                this.setState({ userDetails })
        } catch (e) {
            this.setState({ isError: true })
        }
    }

    imageHandler = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        reader.onload = () => {
            this.setState(prevState => ({
                userDetails: {
                    ...prevState.userDetails,
                    profilePic: base64
                }
            }));
        };

        reader.readAsDataURL(file);
    };

    userPassword = async (password) => {
        const { newPassword } = this.state
        this.setState({
            submitLoading: true
        });

        const userPassword = await axios.post("/admin/updateUserPassword",
            {
                userId: getUserId(),
                newPassword,
            })
            .then(success)
            .catch(error)
        this.setState({ submitLoading: false });
    }

    userProfile = async (profile) => {
        this.setState({
            saveLoading: true
        });
        const { userDetails } = this.state

        const userPassword = await axios.post("/admin/updateUserProfile",
            { ...userDetails, name: userDetails.userName }
        )
            .then(success)
            .catch(error)
        this.setState({ saveLoading: false });
    }

    userNameChanged = (userName) => {
        this.setState(prevState => ({
            userDetails: {
                ...prevState.userDetails,
                userName
            }
        }))
    }

    emailChanged = (emailId) => {
        this.setState(prevState => ({
            userDetails: {
                ...prevState.userDetails,
                emailId
            }
        }))
    }

    phNumberChanged = (phoneNumber) => {

        this.setState(prevState => ({
            userDetails: {
                ...prevState.userDetails,
                phoneNumber
            }
        }))
    }

    profileUI = () => {
        const { userDetails, saveLoading, isError, password, profile, loading, submitLoading } = this.state
        console.log("Profile", userDetails)
        if (loading) {
            return (
                <div className={'content-body-wrapper'}>

                    <div className={'profile-card'}  >
                        <Card
                            style={{ width: '100%' }}>
                            <Skeleton paragraph={{ rows: 10 }} />
                        </Card>
                    </div>
                    <div className={'profile-card-pwd'}>
                        <Card
                            style={{ width: '100%' }}>
                            <Skeleton paragraph={{ rows: 8 }} />
                        </Card>
                    </div>

                </div>
            )
        } else if (isError) {
        } else if (userDetails.userName) {
            return (
                <div className={'content-body-wrapper'}>
                    <div className={'profile-card'} >
                        <Card >
                            <div className={'title-card'}>Personal Profile</div>
                            <div className={'img-card'}>
                                <img alt="" id="img" src={userDetails.profilePic}
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
                                onChange={(e) => this.imageHandler(e)}
                            />

                            <Space direction="vertical">
                                <div className="profile-card-body" >
                                    <Form
                                        layout="vertical"
                                        name="nest-profile" >
                                        <Form.Item name='name'
                                            label="Full Name"
                                            rules={[{ required: true, message: 'Please input your Username!' }]}
                                        >
                                            <Input
                                                defaultValue={userDetails.userName}
                                                onChange={e => this.userNameChanged(e.target.value)}
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
                                                defaultValue={userDetails.emailId}
                                                onChange={e => this.emailChanged(e.target.value)}
                                                size="large"
                                                style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                            rules={[{
                                                required: true,
                                                message: 'Please input your phone number!'
                                            }]}
                                        >
                                            <Input
                                                type='tel'
                                                size="large"
                                                title="Please Input Number"
                                                pattern="[+][0-9]{2}-[0-9]{10}" required
                                                defaultValue={userDetails.phoneNumber}
                                                onChange={e => this.phNumberChanged(e.target.value)}
                                                style={{ borderRadius: '5px' }}
                                                maxLength={14}
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <Button
                                    className={'profile-primary-btn'}
                                    onClick={() => this.saveUserDetails()}
                                    htmlType="submit" loading={saveLoading} onClick={() => this.userProfile(profile)}> Submit
                            </Button>
                            </Space>
                        </Card>
                    </div>
                    <div className={'profile-card-pwd'}>
                        <Card>
                            <div
                                onClick={() => this.changePassword()}
                                className={'title-card'}>
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
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(__, value) {
                                                        if (!value || getFieldValue('password').length > 5) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject('Invalid password length');
                                                    },
                                                }),
                                            ]}

                                        >
                                            <Input.Password
                                                type='password'
                                                onChange={e => this.setState({ newPassword: e.target.value })}
                                                size="large"
                                                style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                        <Form.Item

                                            name="confirm"
                                            label="Confirm Password"
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
                                            <Input.Password
                                                type="password"
                                                onChange={e => this.setState({ reEnterPassword: e.target.value })}
                                                size="large"
                                                style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <Button className={'profile-primary-pwd-btn'} loading={submitLoading} onClick={() => this.userPassword(password)}>
                                    Submit
                                        </Button>
                            </Space>
                        </Card>
                    </div>
                </div>
            )
        }
    }

    changePassword = async () => {
        const { newPassword } = this.state
        this.setState({ isChangePasswordLoading: true })
        try {
            const { data } = await axios.get('admin/updateUserPassword',
                {
                    userId: getUserId(),
                    newPassword,
                }
            )
            this.setState({
                isChangePasswordLoading: false
            })
        } catch (e) {
            this.setState({ isChangePasswordError: true })
        }
    }

    render() {
        return (
            <div className="profile-screen">
                <div>
                    <div className={'content-wrapper'}>
                        <PageTitle
                            title={'Profile'}
                        />
                        {this.profileUI()}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);
