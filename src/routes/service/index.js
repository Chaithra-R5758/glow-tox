import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, Image, Form } from 'antd';
import React, { useState } from 'react';
import { response } from './mock.js'
import { responseId } from './mock-id.js'
import { withRouter } from 'react-router-dom';
import axios from '../../config/api/'

const { Meta } = Card;
const { TextArea } = Input;
const { Link } = Anchor;


class Service extends React.Component {
  //   React.useEffect(() => {
  //   fetch('')
  //     .then(results => results.json())
  //     .then(data => {
  //       debugger
  //       // const {name} = data.results[0];
  //       // setFirstName(name.first);
  //       // setLastName(name.last);
  //     });
  // }, []);
  constructor(){
    super()
    this.state = {
      service: {}
    }
  }

 async componentDidMount(){
    const result = await axios.get('/admin/getAllAdminServices',)
 }

  state = {
    loadings: []
  };
  // state = { visible: true };

  showModal = (service) => {
    this.setState({
      visible: true,
      service,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { loadings, service, visible } = this.state;
    return (

      <div className="service-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service'}
          />
          <div className={"service-card"}>
            <Card>
              <div className={'content-body-wrapper'}>
                <div className={'primary-btn'} onClick={() => this.showModal()}>
                  Add New Service
            </div>
            <div className={'modal-wrapper'}>
                <Modal
                  visible={this.state.visible}
                  wrapClassName={'update-panel'}
                  onCancel={this.hideModal} footer={null} width={800}
                  style={{ top: 100 }}>
                  <div className={'modal-title'} style={{ fontFamily: "Poppins, sans-serif",
                    fontWeight: ' bolder', fontSize: '18px', marginTop: 20
                   
                  }}>Service Add/Edit</div>
                  <Button loading={0}
                    onClick={() => this.enterLoading(1)} className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 25px', marginTop: '-30px' }}>Save</Button>
                  <div className={'service-add-left-content'} style={{ display: 'flex', marginTop: 20 }}>
                    <img
                      width={450} height={280}
                      className={'service-add-img'}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU" />
                    <div className="create-wrapper" style={{ marginLeft: 30,marginTop:-20, width: 370, fontFamily: "Poppins,sans-serif", textShadow: '0.5px 0.5px yellow' }} >
                      <Form
                        layout="vertical"
                        name="nest-messages">
                        <Form.Item
                          name={['user', 'name']}
                          label={`Service Name`}
                        >
                          <Input
                            value={service && service.serviceName || ''}
                            style={{ blockSize: 40, borderRadius: '5px' }} />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Email Id"
                          rules={[{ type: 'email' }]}>
                          <Input
                            value={service && service.description || ''}
                            style={{ blockSize: 40, borderRadius: '5px' }} />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Description"
                          rules={[{ type: 'email' }]}>
                          <TextArea
                            value={service && service.description || ''}
                            rows={7} style={{ borderRadius: '5px' }} />
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                  <div style={{marginTop:'-85px'}}>
                  <div className="modal-title" style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: ' bolder', fontSize: '14px'
                  }}>  Some Pics+ </div>
                  
                  <div className={'wrapper'} style={{marginTop:20,display:'flex',width:'50%',overflowX:'auto'}}>
                <img width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img style={{marginRight:20}} width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img  width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img style={{marginRight:20}} width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img  width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img style={{marginRight:20}} width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img  width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img style={{marginRight:20}} width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img  width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img style={{marginRight:20}} width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img  width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                <img style={{marginRight:20}} width={60}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1vm2W-b2WQOKVn-OHECsVw0jGt9zY1SLeg&usqp=CAU"/>
                </div>
                </div>
                </Modal>
                </div>
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
                            src={service.serviceImage ? service.serviceImage : loginImg}
                            style={{
                              height: '200px',
                              backgroundColor: '#EFF2F7',
                              position: 'relative',
                              objectFit: 'cover',
                              borderRadius: '0 0 50% 50%/0 0 15% 15%',
                              borderTopLeftRadius: '5px',
                              borderTopRightRadius: '5px',
                            }}
                          />}>
                          <div className={'service-card-body-wrapper'}>
                            <div className={'service-meta-data-wrapper'}>
                              <div className={'service-title'}>{service.serviceName ?
                                service.serviceName :
                                "No-Title"
                              }</div>
                              <div className={'edit-btn'} 
                              onClick={() => this.showModal(service)}>
                                Edit
                                </div>
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

}
export default withRouter(Service);
