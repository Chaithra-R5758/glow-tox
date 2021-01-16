import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, Image, Form } from 'antd';
import React, { useState } from 'react';
const { Meta } = Card;
const { TextArea } = Input;


const { Link } = Anchor;

function Service() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="service-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Service'}
        />
        <div className={"service-card"}>
          <Card>
            <div className={'content-body-wrapper'}>
              <div className={'primary-btn'} onClick={showModal}>
                Add New Service
            </div>
              <Modal visible={isModalVisible} footer={null} closable={false} width={800} style={{ top: 100 }} >
                <div className="modal-title" style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: ' bolder', fontSize: '18px'
                }}>Service Add/Edit</div>
                <Button className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 45px 0px 45px', marginTop: '-30px' }}>Save</Button>



                <div className={'service-add-left-content'} style={{ display: 'flex', marginTop: 20 }}>
                  <Image
                    width={350}
                    className={'service-add-img'}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU" />

                  <div className="create-wrapper" style={{ marginLeft: 30, width: 370, fontFamily: "Poppins,sans-serif",textShadow:'0.5px 0.5px yellow' }} >



                    <Form
                      layout="vertical"
                      name="nest-messages"
                    >
                      <Form.Item name={['user', 'name']} label="Service Name"
                      // rules={[{ required: true }]}
                      >
                        <Input style={{ blockSize: 40, borderRadius: '5px' }} />
                      </Form.Item>
                      <Form.Item name={['user', 'email']} label="Email Id"
                        rules={[{ type: 'email' }]}>
                        <Input style={{ blockSize: 40, borderRadius: '5px' }} />
                      </Form.Item>
                      <Form.Item name={['user', 'email']} label="Description"
                        rules={[{ type: 'email' }]}>
                        <TextArea rows={7} style={{ borderRadius: '5px' }} />
                      </Form.Item>
                    </Form>
                  </div>
                </div>



              </Modal>
              <div className={'dashboard-card-wrapper'}>
                {/* {
              ["", "", "", "", ""].map(option =>
                <div className={'dashboard-card'}>
                  <Card
                    style={{ width: 240 }}>
                    <Skeleton paragraph={{ rows: 3 }} />
                  </Card>
                </div>
              )
            } */}
                {
                  ["", "", "", ""].map(option =>

                    <div className={'dashboard-card'}>
                      <Card
                        hoverable
                        style={{ width: '220px', height: '300px' }}
                        cover={<img alt="example" src={loginImg} style={{ height: '200px', backgroundColor: '#EFF2F7', position: 'relative', borderRadius: '0 0 50% 50%/0 0 15% 15%' }} />}>
                        <div className={'service-card-body-wrapper'}>
                          <div className={'service-meta-data-wrapper'}>
                            <Meta title="Service Name" />
                            <div className={'edit-btn'} onClick={() => this.props.history.push('/Servicesadd')}>Edit</div>
                          </div>
                          <div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )
                }
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default Service;
