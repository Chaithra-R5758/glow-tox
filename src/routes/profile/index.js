import { PageTitle } from '../../components/page-title/'

import './profile.scss';
import { Card, Input, Space, Image, Button } from 'antd';

//const { Meta } = Card;

function Profile() {
    return (
        <div className="profile-screen">

            <div>

                <div className={'content-wrapper'}>
                    <PageTitle
                        title={'Profile'}
                    />
                    <div className={'content-body-wrapper'}>
                        <div className={'profile-card'}>
                            <Card type="inner" title="Personal Profile"  >
                                <div className={'img-card'}>
                                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                    />
                                </div>
                                <Space direction="vertical">
                                    <div className="profile-card-body">
                                        <Input  placeholder="Full Name" />
                                    </div>
                                    <div className="profile-card-body">
                                        <Input placeholder="Email" />
                                    </div>
                                    <div className="profile-card-body">
                                        <Input placeholder="Phone Number" />
                                    </div>
                                </Space>

                            </Card>
                        </div>
                        <div className={'profile-card-pwd'}>
                            <Card type="inner" title="Change Password" >

                                <Space direction="vertical">
                                    <div className={'pwd-card-body'}>
                                        <Input.Password placeholder="Enter Your Password" />
                                    </div>
                                    <div className={'pwd-card-body'}>
                                        <Input.Password placeholder="Re-Enter Your Password" />
                                    </div>
                                    <div className={'profile-add-btn'}>
                                        <Button type="primary" shape="round">Submit</Button>
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

export default Profile;