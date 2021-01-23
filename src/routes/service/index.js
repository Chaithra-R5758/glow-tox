import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, Image, Form } from 'antd';
import React, { useState } from 'react';
import { response } from './mock.js'
import { responseId } from './mock-id.js'
import { withRouter } from 'react-router-dom';
import axios from '../../config/api/'
import defaultImg from '../../assets/default.png'

const { Meta } = Card;
const { TextArea } = Input;
const { Link } = Anchor;


class Service extends React.Component {

  constructor() {
    super()
    this.state = {
      service: {}
    }
  }

  async componentDidMount() {
    const result = await axios.get('/admin/getAllAdminServices',)
  }

  state = {
    loadings: []
  };
  // state = { visible: true };

  showModal = (service) => {
    this.setState({
      visible: true,
      service
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
    const { loadings,service } = this.state;
    return (

      <div className="service-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service'}
          />
          <div className={"service-card"}>
            <Card>
              <div className={'content-body-wrapper'}>
                <div className={'primary-btn'} onClick={this.showModal}>
                  Add New Service
            </div>
                <div className={'modal-wrapper'}>
                  <Modal
                    visible={this.state.visible}
                    wrapClassName={'update-panel'}
                    onCancel={this.hideModal} footer={null} width={800}
                    style={{ top: 100 }}>

                    <div style={{ display: 'flex' }}>
                      <div className={'modal-title'} style={{
                        flex: '1',
                        ontFamily: "Poppins, sans-serif",
                        fontWeight: ' bolder',
                        fontSize: '18px',
                        // marginTop: 20
                      }}>
                        Service Add/Edit
                      </div>
                      {/* <Button 
                        onClick={() => this.enterLoading(1)} 
                        className="save-btn"
                        style={{
                          backgroundColor: '#5D72E9', 
                          color: 'white', 
                          borderRadius: '5px', 
                          padding: '0px 25px', 
                          marginTop: '20px' 
                        }}
                        >Save</Button> */}
                    </div>


                    <div
                      className={'modal-content-wrapper'}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div className={'modal-content-left-wrapper'}
                        style={{
                          display: 'flex',
                          flex: '1',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          margin: '0 0 20px 0',
                          flexDirection: 'column',
                        }}
                      >
                        <img
                          //width={450} height={280}
                          style={{    margin: '10%'}}
                          className={'service-add-img'}
                          src={defaultImg} />
                        <div className="modal-title" style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: ' bolder', fontSize: '14px',
                            marginBottom:'10px'
                          }}>  Some Pics+ </div>

                        <div
                        className={'thumnail-list-wrapper'}
                        style={{
                          display:'flex',
                        }}
                        >
                        <div style={{margin:'0 5px'}}>
                          <img
                            width={60} 
                            className={'left'}
                            src={defaultImg} />
                          <img
                            width={60} 
                            className={'right'}
                            src={defaultImg} />
                        </div>
                        <div style={{margin:'0 5px'}}>
                          <img
                            width={60} 
                            className={'left'}
                            src={defaultImg} />
                          <img
                            width={60} 
                            className={'right'}
                            src={defaultImg} />
                        </div>
                      
                        </div>
                        
                      </div>
                      <div
                        className={'modal-content-right-wrapper'}
                        style={{
                          display: 'flex',
                          flex: 1,
                          flexDirection: 'column',
                        }}
                        >
                        <div style={{

                        }}>Service Name</div>
                        <input
                          value={service && service.serviceName || ''}
                          style={{
                            padding: '5px',
                            margin: '5px 0',
                            borderRadius: '5px',
                            border: '1px solid #d9d9d9',
                          }}
                        />
                        <div style={{

                        }}>Email Id</div>
                        <input
                          value={service && service.email || ''}
                          style={{
                            padding: '5px',
                            margin: '5px 0',
                            borderRadius: '5px',
                            border: '1px solid #d9d9d9',
                          }}
                        />
                        <div style={{

                        }}>Description</div>
                        <TextArea
                          defaultValue={service && service.description || ''}
                          rows={7}
                          style={{
                            padding: '5px',
                            margin: '5px 0',
                            borderRadius: '5px',
                            border: '1px solid #d9d9d9',
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        onClick={() => this.enterLoading(1)}
                        className="save-btn"
                        style={{
                          backgroundColor: '#5D72E9',
                          color: 'white',
                          borderRadius: '5px',
                          padding: '0px 25px',
                          marginTop: '20px'
                        }}
                      >Save</Button>


                    </div>


                    {/* <div style={{marginTop:'-85px'}}>
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
                  */}
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
