import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, Image, Form } from 'antd';
import React, { useState } from 'react';
import {BrowserRouter as Router,useHistory} from 'react-router-dom'
import {response} from './mock.js'
import {responseId} from './mock-id.js'

const { Meta } = Card;
const { TextArea } = Input;
const { Link } = Anchor;


function Service() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const history = useHistory();
  const handleHistory = () => {
    history.push("/services" )
  }

  React.useEffect(() => {
    fetch('')
      .then(results => results.json())
      .then(data => {
        debugger
        // const {name} = data.results[0];
        // setFirstName(name.first);
        // setLastName(name.last);
      });
  }, []);

  return (
    <Router>
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
              <Modal visible={isModalVisible} footer={null} width={800} style={{ top: 100 }}onCancel={handleCancel} >
                <div className="modal-title" style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: ' bolder', fontSize: '18px',marginTop:20
                }}>Service Add/Edit</div>
                <Button className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 25px', marginTop: '-30px'}}onClick={handleHistory}>Save</Button>



                <div className={'service-add-left-content'} style={{ display: 'flex', marginTop: 20 }}>
                  <img
                    width={350} height={220}
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
                        <Input 
                          value={responseId.service.serviceName}
                          style={{ blockSize: 40, borderRadius: '5px' }} />
                      </Form.Item>
                      <Form.Item name={['user', 'email']} label="Email Id"
                        rules={[{ type: 'email' }]}>
                        <Input 
                          value={responseId.service.serviceName}
                          style={{ blockSize: 40, borderRadius: '5px' }} />
                      </Form.Item>
                      <Form.Item name={['user', 'email']} label="Description"
                        rules={[{ type: 'email' }]}>
                        <TextArea 
                          value={responseId.service.description}
                          rows={7} style={{ borderRadius: '5px' }} />
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

      response.service.map(service =>

                    <div className={'dashboard-card'}>
                      <Card
                        hoverable
                        style={{ width: '220px', height: '300px' }}
                        cover={<img 
                        alt="example" 
                        src={ service.serviceImage ? service.serviceImage : loginImg }
                        style={{ 
                          height: '200px', 
                          backgroundColor: '#EFF2F7', 
                          position: 'relative', 
                          objectFit: 'cover',
                          borderRadius: '0 0 50% 50%/0 0 15% 15%',
                          borderTopLeftRadius: '5px',
                          borderTopRightRadius: '5px', }}
                      />}>
                        <div className={'service-card-body-wrapper'}>
                          <div className={'service-meta-data-wrapper'}>
                            <div className={'service-title'}>{service.serviceName ?
                            service.serviceName : 
                            "No-Title"
                          }</div>
                            <div className={'edit-btn'} onClick={showModal}>Edit</div>
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
    </Router>
  );
}


export default Service;
