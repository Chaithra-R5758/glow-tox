import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, Image, Button, Anchor } from 'antd';
import { EditFilled } from '@ant-design/icons'
const { Link } = Anchor;
//const { Meta } = Card;
const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
};
const { Option } = Select;

function Profile() {
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
                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElqQujDQxdUSZiRtY81HGprrV_jEvxBZ14Q&usqp=CAU'}
                                        className={'profile-img'} />
                                </div>
                                <div className="edit-btn-card">
                                    
                                        {<EditFilled style={{ color: "#343557", fontSize: '1.5em' }} />}
                                   
                                </div>
                                <Space direction="vertical">
                                    <div className="profile-card-body" >
                                        <Form
                                            
                                            layout="vertical"
                                            name="nest-profile" >
                                            <Form.Item name={['user', 'name']} label="Full Name" >
                                                <Input size="large" style={{borderRadius:'5px'}} />
                                            </Form.Item>
                                            <Form.Item name={['user', 'email']} label="Email Id"
                                                rules={[{ type: 'email' }]}>
                                                <Input size="large" style={{borderRadius:'5px'}} />
                                            </Form.Item>
                                            <Form.Item name={['user', 'phone']} label="Phone Number"
                                                rules={[{ type: 'phoneNum' }]}>
                                                <Input size="large" style={{borderRadius:'5px'}}/>
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
                                                <Input.Password size="large" style={{borderRadius:'5px' }}/>
                                            </Form.Item>
                                            <Form.Item name={['user', 'Confirm']} label="Re-type Password"
                                                rules={[{ type: 'password' }]}>
                                                <Input.Password size="large" style={{borderRadius:'5px' }} />
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

export default Profile;
