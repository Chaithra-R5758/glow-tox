import React, { useState } from 'react';
import { PageTitle } from '../../components/page-title/'
import './gift-card2.scss';
import axios from '../../config/api/'
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Input, Button, Modal, Skeleton } from 'antd';
import { withRouter } from 'react-router-dom';
//import { response } from './mock.js'

class GiftCards extends React.Component {
  constructor() {
    super()
    this.state = {
      isError: false,
      userDetails: {},
      isLoading: false,
      saveServiceLoading: false,
      giftCards: [],
    };
  }

  // state = { visible: true };
  async componentDidMount() {
    this.setState({ isLoading: true })
    try {
      const {data} = await axios.get('/admin/getAllGiftCardsForAdmin',)
      this.setState({
        isLoading: false
      })
      const giftCards = (data && data.giftcards) || ''
      if (giftCards){
        this.setState({ giftCards })
      }
        

    } catch (e) {
      this.setState({ isError: true })
    }
  }

  saveGiftcard = async (giftcard) => {
    this.setState({
      saveGiftcardLoading: true,
    })
    const saveGiftcard = await axios.get('/admin/saveGiftcard', giftcard)
    this.setState({
      saveGiftcardLoading: false,
    })
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
        render: text => <a>{text}</a>
        // render: tags => (
        //   <>
        //     {tags.map(tag => {
        //       let color = tag.length > 5 ? 'geekblue' : 'green';
        //       if (tag === 'Refund') {
        //         color = 'volcano';
        //       }
        //       return (
        //         <Tag color={color} key={tag}>
        //           {tag.toUpperCase()}
        //         </Tag>
        //       );
        //     })}
        //   </>
        // ),
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
    const { isLoading, isError, giftCards } = this.state

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
          <Table dataSource={giftCards} columns={columns} />
        </div>
      )
    }
  }

  render() {
    const { giftCards, giftcard, saveGiftcardLoading } = this.state
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
                      <Input placeholder="Search..." prefix={<SearchOutlined />} />
                    </div>
                    <div className={'primary-btn '} onClick={this.showModal}>
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
                      <Input value="Client Name" placeholder="Client Name" style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }} />
                      <Input value="Email Id" placeholder="Email Id" style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px' }} />
                    </div>
                    <div className={'create-row'} style={{ display: 'flex', marginTop: 20 }}>
                      <Input value="Service Name" placeholder="Service Name" style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }} />
                      <Input
                        value="Value"
                        placeholder="Value"
                        style={{ width: '37%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }}
                      />
                      <div className={" select-wrapper"}  >
                        <select style={{ width: 140, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginBottom: 30 }}>
                          <option value="" > </option>
                          <option value="dollar" >$</option>
                          <option value="percentage">%</option>
                        </select>
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