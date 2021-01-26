import React, { useState } from 'react';
import { PageTitle } from '../../components/page-title/'
import './gift-card2.scss';
import axios from '../../config/api/'
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Input, Button, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { response } from './mock.js'

class GiftCards extends React.Component {
  constructor() {
    super()
    this.state = {
      service: {},
    saveServiceLoading: false,
  };
}

  // state = { visible: true };
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
    const { giftcard, saveGiftcardLoading } = this.state
    const columns = [
      {
        title: 'Gift Card No',
        dataIndex: 'id',
        key: 'id',

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
        title: 'Offer',
        dataIndex: 'offer',
        key: 'offer',

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
                color = 'volcano';
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
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        id: 2,
        address: 'London No. 1 Lake Park',
        tags: ['Redeemed'],
        email: 'hamse@gmail.com',
        offer: '15% off',
        service: 'service 1'


      },
      {
        key: '3',
        name: 'Jim Green',
        age: 42,
        id: 3,
        address: 'London No. 1 Lake Park',
        tags: ['Refund'],
        email: 'hamse@gmail.com',
        offer: '15% off',
        service: 'service 1'


      },
      {
        key: '4',
        name: 'Jim Green',
        age: 42,
        id: 4,
        address: 'London No. 1 Lake Park',
        tags: ['Chargeback'],
        email: 'hamse@gmail.com',
        offer: '15% off',
        service: 'service 1'


      },
      {
        key: '5',
        name: 'Joe Black',
        age: 32,
        id: 5,
        address: 'Sidney No. 1 Lake Park',
        tags: ['Redeemed',],
        email: 'john@gmail.com',
        offer: '20% off',
        service: 'service 1'
      }
    ];

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
                  <Table dataSource={data} columns={columns} />
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
                        <select style={{ width: 140, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px',marginBottom: 30 }}>

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