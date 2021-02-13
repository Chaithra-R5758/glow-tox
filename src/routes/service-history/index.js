import { PageTitle } from '../../components/page-title'
import './service-history.scss';
import { Card, Table, Tag, Button, Input, Skeleton, Modal, Image } from 'antd';
import React, { useState } from 'react';
import axios from '../../config/api/'
import { Error } from '../../components/error'
import defaultImg from '../../assets/default.png'
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons'


class ServiceHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      isError: false,
      userDetails: {},
      isLoading: false,
      serviceHistory: [],
      service: {},
      saveGiftcardLoading: false,
      searchText: '',
      serviceHistorySearchResult: [],
      serviceId: '',
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    try {
      const { data } = await axios.get('transaction/getAllTransaction',)
      this.setState({
        isLoading: false
      })
      const serviceHistory = (data && data.transaction) || ''
      if (serviceHistory)
        this.setState({ serviceHistory })

    } catch (e) {
      this.setState({ isError: true })
    }
  }



  showModal = (serviceId) => {
    this.setState({
      visible: true,
      serviceId,
    });
    this.getServiceForID(serviceId)
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  servicesUI = () => {

    const columns = [
      {
        title: 'Transaction Id',
        dataIndex: 'transactionId',
        key: 'transactionId',
      },
      {
        title: 'Client Name',
        dataIndex: 'clientName',
        key: 'clientName',
        render: text => <div>{text}</div>,
      },
      {
        title: 'Client EmailId',
        dataIndex: 'clientEmailId',
        key: 'clientEmailId',
      },
      {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
      },
      {
        title: 'Promo Code',
        dataIndex: 'promoCode',
        key: 'promoCode',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => (<Tag color={'green'} key={''}>
          {status.toUpperCase()}
        </Tag>)
      },
      {
        // title: '',
        // dataIndex: 'btn',
        // key: 'btn',
        title: '',
        dataIndex: 'transactionId',
        key: 'transactionId',
        render: id => <div className="view-btn" onClick={() => this.showModal(id)}>View</div>
      }
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        TransactionId: 1,
        address: 'New York No. 1 Lake Park',
        tags: ['paid',],
        email: 'akash@gmail.com',
        offer: '10% off',
        service: 'service 1',
        promoname: 'No',
      },

    ];

    const { serviceHistory, isLoading, isError, serviceHistorySearchResult, service } = this.state
    if (isLoading) {
      return (

        <div className={'history-card'}>
          <Skeleton paragraph={{ rows: 10 }} />

        </div>
      )
    }
    else if (isError) {

    } else {
      return (
        <div className={'history-card'}>
          <Table dataSource={serviceHistorySearchResult.length ? serviceHistorySearchResult : serviceHistory} columns={columns} />
        </div>
      )
    }
  }

  getServiceForID = async (id) => {
    try {
      const { data } = await axios.get(`/transaction/getTransaction?transactionId=${id}`)
      const transaction = data && data.transaction

      this.setState({
        service: transaction,
      })
    }
    catch (e) {
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

  searchTextChanged = (searchText) => {
    const { serviceHistory } = this.state
    const serviceHistorySearchResult = serviceHistory.filter(service => service.clientName.toLowerCase().includes(searchText.toLowerCase()))
    this.setState({ searchText, serviceHistorySearchResult })
  }

  render() {

    const { service, saveServiceLoading, searchText, } = this.state


    return (

      <div className="service-history-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service History'}
          />
          <div className={"history-card"}>
            <Card>
              <div className={'service-history-wrapper'}>
                <div className={'gift-card-inner-wrapper'}>
                  <div className={'search-wrapper'} >
                    <Input placeholder="Search..." prefix={<SearchOutlined />} value={searchText}
                      onChange={e => this.searchTextChanged(e.target.value)} />
                  </div>
                  {this.servicesUI()}
                  <Modal
                    visible={this.state.visible}
                    onCancel={this.hideModal} footer={null} width={700} style={{ top: 130 }} >
                    <div className="modal-title" style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: ' bolder', fontSize: '18px', marginTop: -10
                    }}>Service History-View</div>
                    <div className="image-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <img width={130} height={140} src={service.clientImage  || defaultImg} />
                      <div className="create-wrapper" style={{ display: 'flex',flexWrap:'wrap'}}  >
                      <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                      marginLeft: 10,
                    }}
                  >
                   Client Name
                        <Input value={service.clientName} placeholder="Client Name" style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10,marginBottom: -25 }} />
                        </div>
                        <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                      marginLeft: 10
                    }}
                  >
                     Client EmailId 
                
                        <Input value={service.clientEmailId} placeholder="Client EmailId"  style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />
                        </div>
                        </div>
                        <div className="create-wrapper" style={{ display: 'flex',flexWrap:'wrap' }}  >
                         <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                      
                    }}
                  >
                     Client Loyality Points
                        <Input value={service.clientLoyalityPoints} placeholder="Client Loyality Points"  style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />
                        </div>
                        <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                    }}
                  >
                   Client PhoneNumber
                        <Input value={service.clientPhoneNumber} placeholder="Client Phone Number" style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 30 }} />
                        </div>
                      
                    </div>
                    </div>
                    <div style={{ height: '1px', width: '100%', backgroundColor: '#E2E2E2', marginTop: 20 }} />
                    <div className="image-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <img width={130} height={140} src={service.serviceImage || defaultImg} />
                      <div className="create-wrapper"  style={{ display: 'flex',flexWrap:'wrap'}}>
                      <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                      marginLeft: 10,
                    }}
                  >
                   Service Name
                        <Input value={service.serviceName} placeholder="service Name" style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />
                        </div>
                        <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                      marginLeft: 10
                    }}
                  >
                    Promo Code
                        <Input value={service.promoCode} placeholder="promo Code" style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />
                        </div>
                        </div>
                        <div className="create-wrapper" style={{ display: 'flex',flexWrap:'wrap' }}  >
                         <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                      
                    }}
                  > Service Cost 
                        <Input value={service.serviceCost} placeholder="service cost"style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />
                        </div>
                        <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                    }}
                  >
                   Status
                        <Input value={service.status} placeholder="Status" style={{ width: 250, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />
                        </div>
                      
                      </div>
                      </div>


                    {/* <Button loading={saveServiceLoading}
                      onClick={() => this.saveService(service)} 
                      className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: ' 0px 25px', marginTop: -20 }} >
                        Save
                    </Button> */}

                  </Modal>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

    );
  }
}
export default withRouter(ServiceHistory);