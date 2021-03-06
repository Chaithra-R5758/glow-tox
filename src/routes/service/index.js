import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, Modal, Skeleton, Anchor, Input, message, Checkbox, Form, Select } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { imageToBase64, getUserId } from '../../utils/'
import axios from '../../config/api/'
import defaultImg from '../../assets/default.png'
import Error from '../../components/error'
import { BeforeAfter } from './before-after'
import {handleError} from '../../utils/error-handling/'

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
      showError: false,
      saveServiceLoading: false,
      beforeAfterSets: [],
      newService: false,
      category: '',
      categories: []
    }
  }

  getAllServices = async () => {
    this.setState({ loading: true })
    const response = await axios.get('service/getAllService',)
    const services = response.data && response.data.service
    if (services)
      this.setState({ services, loading: false, showMe: true })
  }

  componentDidMount() {
    this.getAllServices()
    this.getServiceCategory()
  }

  imageHandler = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file.size > 3000000) {
     message.error("File size must be under 3MB")
   }
   else {
    const serviceImageFormat = '.' + file.type.split('/')[1]
    const base64 = await imageToBase64(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState(prevState => ({
          service: {
            ...prevState.service, serviceImage: base64,
            serviceImageFormat
          }, showError: false
        }));
      }
    };
    reader.readAsDataURL(file);
  };
 }

  showModal = (service = {}, category) => {
    const { serviceId } = service
    this.getServiceForID(serviceId || '')
    this.setState({
      visible: true,
      service,
      category
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
              style={{
                width: '220px',
                height: '300px',
                opacity: !service.isActive && '.6',
                cursor: !service.isActive && 'auto',
              }}
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
                  <div
                    //className={service.isActive ? 'edit-btn' : 'edit-btn-disabled'}

                    className={'edit-btn'}
                    onClick={() =>this.showModal(service)}>Edit</div>
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
    if (id) {
      try {
        const {data} = await axios.get(`/admin/getServiceById?serviceId=${id}`)
        debugger
        this.setState({
          service:data.service || {},
          saveServiceLoading: false,
        })
      }
      catch (e) {
       handleError(e) 
      }
    }
  }

  getServiceCategory = async () => {
    try {
      const { data } = await axios.get('/service/getAllServiceCategory')
      const categories = data && data.serviceCategory
      this.setState({
        categories,
      })
    }
    catch (e) {
      handleError(e) 
    }
  }

  createLookBook = async () => {
    const { service } = this.state
    this.setState({ saveServiceLoading: true })
    try {
      const {
        beforePic,
        afterPic,
        serviceId,
        picFormat, } = service

      const params = {
        serviceId,
        beforePic,
        afterPic,
        picFormat,
      }
      const saveService = await axios.post("service/saveLookBook", params)
      message.success('LookBook created successfully!');
    } catch (e) {
      message.error('Error Occurred!');
      this.setState({ saveServiceLoading: false })
    }
  }

  createService = async () => {
    const { service } = this.state
    const {
      category,
      cost,
      description,
      serviceImage,
      serviceImageFormat,
      serviceName } = service

    if (
      category &&
      cost &&
      description &&
      serviceImage &&
      serviceImageFormat &&
      serviceName) {
      this.setState({ saveServiceLoading: true })
      try {
        const params = {
          category,
          cost: parseInt(cost),
          description,
          serviceImage,
          serviceImageFormat,
          serviceName
        }
        const saveService = await axios.post("service/saveService", params)
        message.success('New Service updated successfully!');


        // const saveService = await axios.post('/admin/createService', {
        //   ...service,
        //   serviceImage: '',
        // })
        // message.success('Data updated successfully!');
      } catch (e) {
        message.error('Error Occurred!');
      }
      this.setState({ saveServiceLoading: false })
      this.hideModal()
      this.getAllServices()
      //  this.getServiceCategory()
    } else {
      this.setState({
        showError: false
      })
    }
  }

  saveService = async () => {
    const { newService, service } = this.state
    if (newService) {
      //new service
      this.createService()
    }
    else {
      //edit service
      this.setState({
        saveServiceLoading: true,
      })

      // "recId" : "recHnu0OoeHqYl5nu",                        //Mandidate
      //                       "isActive" : true,                                   //Optional
      //                       "cost" : 909,                                        //Optional
      //                       "description" : "Testing update service API",       //Optional
      //                       "serviceImage": "base64 encoded <= 3MB",            //Optional
      //                       "serviceImageFormat" : ".png" 

      const {
        recId,
        isActive,
        cost,
        serviceName,
        description,
        serviceImage,
        serviceImageFormat } = service

      let params = {}
      if (!serviceImageFormat) {
        //image has not been changed
        params = {
          recId,
          isActive,
          cost: parseInt(cost),
          serviceName,
          description,
        }
      }
      else {
        params = {
          recId,
          isActive,
          cost: parseInt(cost),
          serviceName,
          description,
          serviceImage,
          serviceImageFormat
        }
      }
      try {
        const saveService = await axios.post("service/saveService", params);
        message.success('Data updated successfully!');
      } catch (e) {
        message.error('Error Occurred!');
      }
      this.setState({
        saveServiceLoading: false,
      })
      this.hideModal()
      this.getAllServices()
      //   this.getServiceCategory()
      this.setState({
        showError: true,
      })

    }
  }
  onChangeIsActive = e => {
    this.setState((prevState) => ({
      service: {
        ...prevState.service,
        isActive: e.target.checked,
      },
      showError: false,
    }));
  }
  onChangeName = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        serviceName: e.target.value
      },
      showError: false
    }))
  }

  onChangeCategory = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        category: e.target.value
      },
      showError: false
    }))
  }
  onChangeCost = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        cost: e.target.value
      },
      showError: false
    }))
  }
  onChangeDesc = e => {
    this.setState(prevState => ({
      service: {
        ...prevState.service,
        description: e.target.value
      },
      showError: false
    }))
  }

  modalUI = () => {
    const { categories, defaultImg, beforeAfterSets, service, saveServiceLoading, showError, newService } = this.state
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
            <div
              className="modal-code"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: " bolder",
                fontSize: "16px",
                marginBottom: "-35px",
              }}>
              Service Image
                  </div>
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
            {
              !newService &&
              <div className="modal-title"
                onClick={() => this.setState({
                  beforeAfterSets: [...beforeAfterSets, beforeAfterSet]
                })}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: ' bolder', fontSize: '14px',
                  marginBottom: '10px', cursor: 'pointer',
                }}>  Some Pics+
            </div>
            }
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
            {/* <div>Email Id
            </div>
            <Form layout="vertical">
              <Form.Item name='email' rules={[{ type: 'email' }]}>
                <Input
                  type='email'
                  value={service.email|| ''}
                  onChange={this.onChangeEmail}
                  style={{
                    padding: '5px',
                    margin: '5px 0',
                    borderRadius: '5px',
                    border: '1px solid #d9d9d9',
                  }}
                />
              </Form.Item>
            </Form> */}

            {newService &&
              <div>
                <div>Description</div>
                <TextArea
                  value={service.description || ''}
                  onChange={this.onChangeDesc}
                  rows={5}
                  style={{
                    padding: '5px',
                    margin: '5px 0',
                    borderRadius: '5px',
                    border: '1px solid #d9d9d9',
                  }}
                />
              </div>
            }
            <div className={"parent-class"} style={{ display: "flex" }}>
              <div> Category
                    {/* <Input
                    disabled={!newService}
                  onChange={this.onChangeCategory}
                  value={service && service.serviceId}
                  list="option"
                  style={{
                    width: '90%',
                    padding: '5px',
                    margin: '5px 0px',
                    borderRadius: '5px',
                    border: '1px solid #d9d9d9',
                  }}
                /> */}


                {/* <Input
                        onChange={this.onChangeLink}
                        type="text"
                        list="option"
                        value={(promotion && promotion.serviceName) || ""}
                        style={{
                          backgroundColor: " #E2E2E2",
                          blockSize: 30,
                          border: "0px",
                          borderRadius: "5px",
                          marginTop: "5px",
                        }}
                      /> */}
                <select id="option" disabled={!newService}
                  onChange={this.onChangeCategory}
                  type="text"
                  list="option"
                  value={service && service.category || ''}
                  style={{
                    width: '90%',
                    padding: '5px',
                    margin: '5px 0px',
                    borderRadius: '5px',
                    border: '1px solid #d9d9d9',
                  }}>
                  {newService && <option value={''}></option>}
                  {categories.map(
                    cat =>
                      <option value={cat.recId}>{cat.serviceCategory}</option>
                  )}
                </select>
              </div>
              <div> Cost
                    <Input
                    type='number'
                  onChange={this.onChangeCost}
                  value={service.cost || ''}
                  style={{
                    padding: '5px',
                    margin: '5px 0',
                    borderRadius: '5px',
                    border: '1px solid #d9d9d9',
                  }}
                />
              </div>

            </div>
            {!newService &&
              <Checkbox style={{ fontFamily: "Poppins, sans-serif" }} checked={service && service.isActive}
                onChange={e => this.onChangeIsActive(e)}>IsActive</Checkbox>}
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
        {showError && <div style={{
          color: 'red',
          textAlign: 'center',
          margin: '5px 0 -15px 0'
        }}>All the fields are mandatory</div>}
      </Modal>
    )
  }

  addNewService = () => {
    this.setState({
      newService: true,
      service: {},
      showMe: false,
    })
    this.showModal()
    this.getServiceCategory()
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