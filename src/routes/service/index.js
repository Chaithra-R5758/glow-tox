import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, Image, PageHeader, Form } from 'antd';
import React, { useState } from 'react';
import { response } from './mock.js'
import { responseId } from './mock-id.js'
import { withRouter } from 'react-router-dom';
import axios from '../../config/api/'
import defaultImg from '../../assets/default.png'
import { Error } from '../../components/error'
import { BeforeAfter } from './before-after'
const { Meta } = Card;
const { TextArea } = Input;
const { Link } = Anchor;
const beforeAfterSet = {
  before: {},
  after: {},
}
class Service extends React.Component {
  constructor() {
    super()
    this.state = {
      service: {},
      response: {},
      defaultImg,
      loading: false,
      error: false,
      saveServiceLoading: false,
      beforeAfterSets: []
    }
  }

  async componentDidMount() {
    const result = await axios.get('/admin/getAllAdminServices',)
  }

  imageHandler = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ defaultImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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

  servicesUI = () => {
    const { loading, error } = this.state
    if (loading) {
      return (
        ["", "", "", "", ""].map(option =>
          <div className={'dashboard-card'}>
            <Card
              style={{ width: 240 }}>
              <Skeleton paragraph={{ rows: 3 }} />
            </Card>
          </div>
        ))
    }
    else if (error) { return <Error title="Something went wrong" /> }
    else if (response
      && response.service
      && response.service.length === 0) {
      return <Error title="0 Service exists" />
    }
    else if (response
      && response.service
      && response.service.length > 0) {
      return (
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
      )
    }
  }


  saveService = async (service) => {
    this.setState({
      saveServiceLoading: true,
    })
    const saveService = await axios.get('/admin/saveService', service)
    this.setState({
      saveServiceLoading: false,
    })
  }


  render() {
    const { defaultImg } = this.state;
    const { beforeAfterSets, service, saveServiceLoading } = this.state

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
                          width: '50%'
                        }}>
                        <label htmlFor="input">
                          <img
                            src={service.serviceImage || defaultImg}
                            id="img"
                            className="img"
                            style={{
                              margin: '10%',
                              width: 270,
                              height: 200,
                              objectFit: 'contain'
                            }}
                          />
                        </label>
                        <input style={{ display: 'none' }}
                          type="file"
                          accept="image/*"
                          name="image-upload"
                          id="input"
                          onChange={this.imageHandler}
                        />
                        <div className="modal-title"
                          onClick={() => this.setState({
                            beforeAfterSets: [...beforeAfterSets, beforeAfterSet]
                          })}
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: ' bolder', fontSize: '14px',
                            marginBottom: '10px', cursor: 'pointer',
                          }}>  Some Pics+ </div>
                        <div
                          className={'thumnail-list-wrapper'}
                          style={{
                            display: 'flex',
                            overflowX: 'auto',
                            margin: '0 15px'
                          }}>
                          {
                            beforeAfterSets
                              .map(beforeAfterSet => {
                                return (<BeforeAfter beforeAfterSet />)
                              })
                          }
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
                          value={service && service.description || ''}
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
                      }}>
                      <Button
                        loading={saveServiceLoading}
                        onClick={() => this.saveService(service)}
                        className="save-btn"
                        style={{
                          backgroundColor: '#5D72E9',
                          color: 'white',
                          borderRadius: '5px',
                          padding: '0px 25px',
                          marginTop: '20px'
                        }}>Save</Button>
                    </div>
                  </Modal>
                </div>
                <div className={'dashboard-card-wrapper'}>
                  {this.servicesUI()}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )

  }

}
export default withRouter(Service);