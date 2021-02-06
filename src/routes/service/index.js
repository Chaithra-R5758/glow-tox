import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, message, PageHeader, Form } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { imageToBase64, getUserId } from '../../utils/'
import axios from '../../config/api/'
import defaultImg from '../../assets/default.png'
import Error from '../../components/error'
import { BeforeAfter } from './before-after'

const success = () => {
  message.success('Data updated successfully!');
};
const error = () => {
  message.error('Error Occurred!');
};


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
      services: [],
      defaultImg,
      loading: false,
      error: false,
      saveServiceLoading: false,
      beforeAfterSets: [],
      newService: false,
    }
  }

  getAllServices = async () => {
    this.setState({ loading: true })
    const response = await axios.get('/admin/getAllAdminServices',)
    const services = response.data && response.data.service
    if (services)
      this.setState({ services, loading: false })
  }

  componentDidMount() {
    this.getAllServices()
  }

  imageHandler = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const base64 = await imageToBase64(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState(prevState => ({
          service: {
            ...prevState.service, serviceImage: base64
          }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  showModal = (service = {}) => {
    this.setState({
      visible: true,
      service
    });
  };

  hideModal = () => {
    this.setState({
      service: {},
      visible: false,
      newService: false,
    });
  };

  servicesUI = () => {
    const { loading, error, services } = this.state
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
    else if (services && services.length === 0) {
      return <Error title="0 Service exists" />
    }
    else if (services
      && services.length > 0) {
      return (
        services.map(service =>
          <div className={'dashboard-card'}>
            <Card
              hoverable
              style={{ width: '220px', height: '300px' }}
              cover={<img
                alt="example"
                src={service.serviceImage || loginImg}
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
                  <div className={'service-title'}>{service.serviceName || "No-Title"}</div>
                  <div className={'edit-btn'}
                    onClick={() => this.showModal(service)}>Edit</div>
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

  getServiceForID = async (id) => {

    try {
      const service = await axios.get(`/admin/getServiceById?serviceId=${id}`)
      this.setState({
        service,
        saveServiceLoading: false
      })
    }
    catch (e) {
    }
  }
  createService = async () => {
    const { service } = this.state
    this.setState({ saveServiceLoading: true })

    const saveService = await axios.post('/admin/createService', {
      ...service,
      serviceImage: '',
    })
    this.setState({ saveServiceLoading: false })
    this.hideModal()
    this.getAllServices()
      .then(success)
      .catch(error)
    this.setState({ saveServiceLoading: false })

  }

  saveService = async () => {
    const { newService, service } = this.state
    if (newService) {
      this.createService()
    } else {
      this.setState({
        saveServiceLoading: true,
      })
      const saveService = await axios.post('/admin/updateService', {
        ...service,
        userId: getUserId(),
        serviceImage: ''
      })

      this.hideModal()
      this.getAllServices()

        .then(success)
        .catch(error)
      this.setState({
        saveServiceLoading: false,
      })
    }
  }

  onChangeName = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        serviceName: e.target.value
      }
    }))
  }

  onChangeEmail = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        serviceEmail: e.target.value
      }
    }))
  }

  onChangeDesc = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        description: e.target.value
      }
    }))
  }

  modalUI = () => {
    const { defaultImg, beforeAfterSets, service, saveServiceLoading } = this.state
    console.log("service", service)
    return (
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
          }}>
            Service Add/Edit
                      </div>
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
              onChange={(e) => this.imageHandler(e)}
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
            }}>
            <div>Service Name</div>
            <Input

              value={service.serviceName || ''}
              onChange={this.onChangeName}
              style={{
                padding: '5px',
                margin: '5px 0',
                borderRadius: '5px',
                border: '1px solid #d9d9d9',
              }}
            />
            <div>Email Id
            </div>
            <Form layout="vertical">
              <Form.Item name='email' rules={[{ type: 'email' }]}>
                <Input
                  type='email'
                  value={service.email}
                  onChange={this.onChangeEmail}
                  style={{
                    padding: '5px',
                    margin: '5px 0',
                    borderRadius: '5px',
                    border: '1px solid #d9d9d9',
                  }}
                />
              </Form.Item>
            </Form>
            <div>Description</div>
            <TextArea
              value={service.description}
              onChange={this.onChangeDesc}
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
    )
  }

  addNewService = () => {
    this.setState({
      newService: true,
      service: {},
    })
    this.showModal()
  }

  render() {
    return (
      <div className="service-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service'}
          />
          <div className={"service-card"}>
            <Card>
              <div className={'content-body-wrapper'}>
                <div className={'primary-btn'} onClick={() => this.addNewService()}>
                  Add New Service
              </div>
                <div className={'modal-wrapper'}>
                  {this.modalUI()}
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