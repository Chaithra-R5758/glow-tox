import { PageTitle } from '../../components/page-title'
import './service-history.scss';
import { Card, Table, Tag, Button, Input, Skeleton, Modal, Image } from 'antd';
import React, { useState } from 'react';
import axios from '../../config/api/'
import { Error } from '../../components/error'
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
      searchText:'',
      serviceHistorySearchResult:[],
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true })
    try {
      const { data } = await axios.get('/admin/getAllServiceTransactionForAdmin',)
      this.setState({
        isLoading: false
      })
      const serviceHistory = (data && data.serviceHistory) || ''
      if (serviceHistory)
        this.setState({ serviceHistory })

    } catch (e) {
      this.setState({ isError: true })
    }
  }



  showModal = () => {
    this.setState({
      visible: true,
    });
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
        dataIndex: 'TransactionId',
        key: 'TransactionId',
      },
      {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Email Id',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Service',
        dataIndex: 'service',
        key: 'service',
      },
      {
        title: 'Promo Name',
        dataIndex: 'promoname',
        key: 'promoname',
      },
      {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'Refund') {
                color = 'orange';
              } else if (tag === 'chargeback') {
                color = 'red';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: '',
        dataIndex: 'btn',
        key: 'btn',
        render: text => <div className="view-btn" onClick={this.showModal}>View</div>

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

    const { serviceHistory, isLoading, isError ,serviceHistorySearchResult} = this.state
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
          <Table dataSource={serviceHistorySearchResult.length ? serviceHistorySearchResult :serviceHistory } columns={columns} />
        </div>
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

  searchTextChanged = (searchText) => {
    const { serviceHistory } = this.state
    const serviceHistorySearchResult =  serviceHistory.filter(service => service.TransactionId.toLowerCase().includes(searchText))
    this.setState({searchText, serviceHistorySearchResult})
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
                    <Input placeholder="Search..." prefix={<SearchOutlined />}  value={searchText}
                        onChange={e => this.searchTextChanged(e.target.value)}/>
                  </div>
                  {this.servicesUI()}
                  <Modal
                    visible={this.state.visible}
                    onCancel={this.hideModal} footer={null} width={600} style={{ top: 180 }} >
                    <div className="modal-title" style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: ' bolder', fontSize: '18px', marginTop: -10
                    }}>Service History-View</div>


                    <div className="image-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <img width={'90'} height={90} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChQdlYiED1Ot1XBsYrExnQlEPnuU55oXFXA&usqp=CAU" />
                      <div className="create-wrapper"  >

                        <Input value="Full Name" placeholder="Full Name" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Loyality Points" placeholder="Loyality Points" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Email Id" placeholder="Email Id" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Mobile Number" placeholder="Mobile Number" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                      </div>

                    </div>
                    <div style={{ height: '1px', width: '100%', backgroundColor: '#E2E2E2', marginTop: 20 }} />
                    <div className="image-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <img width={90} height={90} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTChQdlYiED1Ot1XBsYrExnQlEPnuU55oXFXA&usqp=CAU" />
                      <div className="create-wrapper" >

                        <Input value="Full Name" placeholder="Full Name" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Loyality Points" placeholder="Loyality Points" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Email Id" placeholder="Email Id" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 10 }} />

                        <Input value="Mobile Number" placeholder="Mobile Number" style={{ width: 220, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginLeft: 10, marginBottom: 30 }} />

                      </div>

                    </div>
                    <Button loading={saveServiceLoading}
                      onClick={() => this.saveService(service)} className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: ' 0px 25px', marginTop: -20 }} >Save</Button>

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