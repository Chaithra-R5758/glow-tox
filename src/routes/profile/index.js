import { PageTitle } from '../../components/page-title/'
import { Form, Select } from 'antd';
import './profile.scss';
import { Card, Input, Space, Image, Button,Anchor } from 'antd';
import brandLogo from '../../assets/test-img.jpg'

const { Link } = Anchor;
//const { Meta } = Card;
const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
};
const { Option } = Select;
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);
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
                        
                            <Card type="inner" title="Personal Profile" >
                                <div className={'img-card'}>
                                <img src={'https://lh3.googleusercontent.com/ogw/ADGmqu8O8PGfR1MiMeaUyOfc7EvwnENHHbMADvGh_-d9Tw'}
                                 className={'profile-img'}/>
                                </div>
                                <Space direction="vertical">
                                    <div className="profile-card-body" >
                                        <Form
                                            {...layout}
                                            name="nest-profile">
                                            <Form.Item name={['user', 'name']} label="Full Name">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name={['user', 'email']} label="Email Id"
                                                rules={[{ type: 'email' }]}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item name={['user', 'phone']} label="Phone Number"
                                                rules={[{ type: 'phoneNum' }]}>
                                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Form>

                                    </div>

                                </Space>

                            </Card>
                            
                        </div>
                      
                        <div className={'profile-card-pwd'}>
                            <Card type="inner" title="Change Password" >

                                <Space direction="vertical" >
                                    <div className={'pwd-card-body'}  >
                                        <Form
                                            {...layout}
                                            name="nest-profile" >
                                            <Form.Item name={['user', 'password']} label="Password"
                                                rules={[{ type: 'password' }]}>
                                                <Input.Password />
                                            </Form.Item>
                                            <Form.Item name={['user', 'Confirm']} label="Re-type Password"
                                                rules={[{ type: 'password' }]}>
                                                <Input.Password />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className={'profile-primary-btn'} >
                                    Submit
                                    {/* <Anchor affix={false}><Link href="/Header" title="Submit" /></Anchor> */}
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
