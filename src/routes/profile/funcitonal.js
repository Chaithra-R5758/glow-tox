import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, message, Skeleton, Button } from 'antd';
import { EditFilled } from '@ant-design/icons'
import axios from '../../config/api/'
import { withRouter } from 'react-router-dom';
import React, { Component, useState, useEffect } from 'react';
import { imageToBase64, getUserId } from '../../utils/'

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

const Profile = () => {

    const [submitLoading, setSubmitLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [isChangePasswordLoading, setIsChangePasswordLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [profile, setProfile] = useState({})
    const [profilePic, setProfilePic] = useState('')
    const [password, setPassword] = useState({})
    const [newPassword,setNewPassword] = useState('')

    useEffect(() => {
        async function getUserDetails() {
            setLoading(true)
            try {
                const { data } = await axios.get('user/me')
                setLoading(false)
                const userDetails = (data && data.user) || ''
                if (userDetails)
                    setUserDetails(userDetails)
            } catch (e) {
                setLoading(false)
                setIsError(true)
            }
        }
        getUserDetails()
    }, [])

    const imageHandler = async (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        const base64 = await imageToBase64(file);
        reader.onload = () => {
            // setState(prevState => ({
            //     userDetails: {
            //         ...prevState.userDetails,
            //         profilePic: base64
            //     }
            // }));
        };

        reader.readAsDataURL(file);
    };

    const userPassword = async (password) => {
        //const { newPassword } = state
        setSubmitLoading(true)
        // setState({
        //     submitLoading: true
        // });
        const userPassword = await axios.post("user/updatePassword",
            {
                userId: getUserId(),
                newPassword,
            })
            .then(success)
            .catch(error)
        setSubmitLoading(false)
        //setState({ submitLoading: false });
    }

    const userProfile = async (profile) => {
        setSaveLoading(true)
        // setState({
        //     saveLoading: true
        // });
        //const { userDetails } = state
        const userPassword = await axios.post("user/updateUserProfile",
            { ...userDetails, name: userDetails.userName }
        )
            .then(success)
            .catch(error)
        setSaveLoading(false)
        // setState({ saveLoading: false });
    }

    const userNameChanged = (userName) => {
        // setState(prevState => ({
        //     userDetails: {
        //         ...prevState.userDetails,
        //         userName
        //     }
        // }))
    }

    const emailChanged = (emailId) => {
        // setState(prevState => ({
        //     userDetails: {
        //         ...prevState.userDetails,
        //         emailId
        //     }
        // }))
    }

    const phNumberChanged = (phoneNumber) => {
        // setState(prevState => ({
        //     userDetails: {
        //         ...prevState.userDetails,
        //         phoneNumber
        //     }
        // }))
    }

    const profileUI = () => {
        //const { userDetails, saveLoading, isError, password, profile, loading, submitLoading } = state
        //console.log("Profile", userDetails)
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
                                onChange={(e) => imageHandler(e)}
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
                                                onChange={e => userNameChanged(e.target.value)}
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
                                                onChange={e => emailChanged(e.target.value)}
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
                                                onChange={e => phNumberChanged(e.target.value)}
                                                style={{ borderRadius: '5px' }}
                                                maxLength={14}
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <Button
                                    className={'profile-primary-btn'}
                                    //onClick={() => saveUserDetails()}
                                    htmlType="submit" 
                                    loading={saveLoading} 
                                    onClick={() => userProfile(profile)}> Submit
                            </Button>
                            </Space>
                        </Card>
                    </div>
                    <div className={'profile-card-pwd'}>
                        <Card>
                            <div
                                onClick={() => changePassword()}
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
                                                        if (!value || getFieldValue('password').length >= 5) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject('Invalid password length');
                                                    },
                                                }),
                                            ]}

                                        >
                                            <Input.Password
                                                type='password'
                                                onChange={e => setNewPassword(e.target.value)}
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
                                                onChange={e => setNewPassword(e.target.value)}
                                                size="large"
                                                style={{ borderRadius: '5px' }} />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <Button className={'profile-primary-pwd-btn'} loading={submitLoading} onClick={() => userPassword(password)}>
                                    Submit
                                        </Button>
                            </Space>
                        </Card>
                    </div>
                </div>
            )
        }
    }

    const changePassword = async () => {
        //const { newPassword } = state
        //setState({ isChangePasswordLoading: true })
        setIsChangePasswordLoading(true)
        try {
            const { data } = await axios.get('admin/updateUserPassword',
                {
                    userId: getUserId(),
                    newPassword,
                }
            )
            setIsChangePasswordLoading(false)
            // setState({
            //     isChangePasswordLoading: false
            // })
        } catch (e) {
            //setIsChangePasswordError(true)
            //setState({ isChangePasswordError: true })
        }
    }

    return (
        <div className="profile-screen">
            <div>
                <div className={'content-wrapper'}>
                    <PageTitle
                        title={'Profile'}
                    />
                    {profileUI()}
                </div>
            </div>
        </div>
    );

}
export default Profile
