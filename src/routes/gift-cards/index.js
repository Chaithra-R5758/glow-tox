import React, { useState } from 'react';
import { PageTitle } from '../../components/page-title/'
import './gift-card.scss';
import axios from '../../config/api/'
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Input, Button, Modal, Skeleton, message } from 'antd';
import { withRouter } from 'react-router-dom';
const success = () => {
  message.success('Data added successfully!');
};
const error = () => {
  message.error('Error Occurred!');
};

class GiftCards extends React.Component {
  constructor() {
    super()
    this.state = {
      isError: false,
      userDetails: {},
      isLoading: false,
      saveServiceLoading: false,
      giftcard: {},
      giftCards: [],
      searchText:'',
      giftCardSearchResult:[],
    };
  }

  getAllGiftCards = async () => {
    this.setState({ isLoading: true })
    try {
      const { data } = await axios.get('/admin/getAllGiftCardsForAdmin',)
      this.setState({
        isLoading: false
      })
      const giftCards = (data && data.giftcards) || ''
      if (giftCards) {
        this.setState({ giftCards })
      }
    } catch (e) {
      this.setState({ isError: true })
    }
  }

  async componentDidMount() {
    this.getAllGiftCards()
  }

  saveGiftcard = async () => {
    const {
      clientName,
      emailId,
      offer,
      serviceId,
    } = this.state
    this.setState({
      saveGiftcardLoading: true,
    })


    const saveGiftcard = await axios.post('/admin/createGiftCardsByAdmin',
      {
        clientName,
        emailId,
        offer,
        serviceId,
      })
    this.setState({ saveGiftcardLoading: false });
    this.hideModal()
    this.getAllGiftCards()
      .then(success)
      .catch(error)

  }




  showModal = () => {
    this.setState({
      visible: true,
      clientName: '',
      emailId: '',
      offer: '',
      serviceId: '',
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  giftcardUI = () => {
    const columns = [
      {
        title: 'Gift Card No',
        dataIndex: 'giftCardId',
        key: 'giftCardId',
      },
      {
        title: 'Client Name',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Email Id',
        dataIndex: 'clientEmail',
        key: 'clientEmail',

      },
      {
        title: 'Service',
        dataIndex: 'serviceName',
        key: 'serviceName',

      },
      {
        title: 'Offer',
        dataIndex: 'offer',
        key: 'offer',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status =>
          (<Tag color={'green'} key={status}>{status}</Tag>)
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        id: 1,
        address: 'New York No. 1 Lake Park',
        tags: ['New'],
        email: 'akash@gmail.com',
        offer: '10% off',
        service: 'service 1'
      },
    ];
    const { isLoading, isError, giftCards, giftCardSearchResult } = this.state

    if (isLoading) {
      return (
        <div className={'gift-card'}>
          <Skeleton paragraph={{ rows: 10 }} />
        </div>
      )
    }
    else if (isError) {

    } else {
      return (
        <div className={'gift-card'}>
          <Table dataSource={giftCardSearchResult.length ? giftCardSearchResult : giftCards } columns={columns} />
        </div>
      )
    }
  }

  searchTextChanged = (searchText) => {
    const { giftCards } = this.state
    const giftCardSearchResult =  giftCards.filter(giftcard => giftcard.giftCardId.toLowerCase().includes(searchText))
    this.setState({searchText, giftCardSearchResult})
  }

  render() {
    const {
      giftCards,
      giftcard,
      saveGiftcardLoading,
      searchText,
    } = this.state
    const {
      serviceId,
      clientName,
      emailId,
      offer
    } = giftcard
    return (

      <div className="gift-card-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Gift Cards'}
          />
          <div className={"gift-card"}>
            <Card>
              <div className={'gift-card-wrapper'}>
                <div className={'gift-card-inner-wrapper'}>
                  <div className={'options-wrapper'}>
                    <div className={'search-wrapper'}>
                      <Input placeholder="Search..." 
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => this.searchTextChanged(e.target.value)} />
                    </div>
                    <div className={'primary-btn '} onClick={() => this.showModal(giftcard)}>
                      Create New
                  </div>
                  </div>
                  {this.giftcardUI()}
                  <Modal
                    visible={this.state.visible}
                    onCancel={this.hideModal} footer={null} width={700} style={{ top: 250 }} >
                    <div className="modal-title" style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: ' bolder', fontSize: '18px', marginTop: -10
                    }}>Gift Cards-Create</div>

                    <div className="create-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                      <Input
                        placeholder="Client Name"
                        defaultValue={clientName}
                        onChange={e => this.setState({ clientName: e.target.value })}
                        style={{
                          width: '70%',
                          backgroundColor: ' #E2E2E2',
                          blockSize: 40, border: '0px',
                          borderRadius: '5px',
                          marginRight: 10
                        }}
                      />
                      <Input
                        placeholder="Email Id"
                        defaultValue={emailId}
                        onChange={e => this.setState({ emailId: e.target.value })}
                        style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px' }} />
                    </div>
                    <div className={'create-row'} style={{ display: 'flex', marginTop: 20 }}>
                      <Input
                        placeholder="Service Name"
                        defaultValue={serviceId}
                        onChange={e => this.setState({ serviceId: e.target.value })}
                        style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }} />
                      <Input
                        placeholder="Value"
                        defaultValue={offer}
                        onChange={e => this.setState({ offer: e.target.value })}
                        style={{ width: '37%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }}
                      />
                      <div className={" select-wrapper"}  >
                        <input type="text" list="option" style={{ width: 140, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginBottom: 30 }} />
                        <datalist id="option" >
                          <option>$</option>
                          <option>%</option>
                        </datalist>
                      </div>
                    </div>
                    <Button loading={saveGiftcardLoading}
                      onClick={() => this.saveGiftcard(giftcard)} className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 25px 0px 25px', marginTop: '-20px' }}>Save</Button>
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
export default withRouter(GiftCards);