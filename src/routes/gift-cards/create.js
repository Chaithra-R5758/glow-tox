import { PageTitle } from '../../components/page-title/'
import './gift-card.scss';
import React, { Component, Suspense } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Card, Select, Skeleton, Anchor } from 'antd';

const { Option } = Select;
const { Link } = Anchor;


class Dashboard extends Component {
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        return (
            <div className="gift-card-screen">
                <div className={'content-wrapper'}>
                    <PageTitle
                        title={'Gift Card - Create'}
                    />
                    <div className={'content-body-wrapper'}>
                        <div className={'gift-card-inner-wrapper'}>
                            <div className={'options-wrapper'}>
                                <div className={'primary-btn'} onClick={() => this.props.history.push('/Giftcards')}> Send</div>
                            </div>
                            {/* <div className={'card-wrapper'}>
                        <Card
                    style={{ width: 900}}>
                    <Skeleton paragraph={{ rows: 6 }} />
                  </Card>
                        </div> */}
                            <div className={'card-wrapper'}>
                                <Card
                                    
                                >

                                    <Form
                                        {...layout}
                                        name="nest-messages"
                                    //validateMessages={validateMessages}
                                    >
                                        <div className={'gift-card-create-row-wrapper'}>
                                            <div className={'gift-card-create-row'}>

                                                <Form.Item name={['user', 'name']} label="Client Name"
                                                // rules={[{ required: true }]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item name={['user', 'email']} label="Email Id" rules={[{ type: 'email' }]}>
                                                    <Input />
                                                </Form.Item>

                                            </div>
                                            <div className={'gift-card-create-row'}>

                                                <Form.Item name={['user', 'age']} label="Service Name" rules={[{ type: 'number', min: 0, max: 99 }]}>
                                                    <Input />

                                                </Form.Item>
                                                <Form.Item name={['user', 'website']} label="Offer">
                                                    <span>
                                                        <Input
                                                            type="text"
                                                            value={''}
                                                            // onChange={onNumberChange}
                                                            style={{ width: '50%' }}
                                                        />
                                                        <Select
                                                            value={"$"}
                                                            style={{ width: '40%', margin: '0 8px' }}
                                                        // onChange={onCurrencyChange}
                                                        >
                                                            <Option value="dollar">$</Option>
                                                            <Option value="percentage">%</Option>
                                                        </Select>
                                                    </span>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Dashboard);