import React, { useState } from 'react';
import { PageTitle } from '../../components/page-title/'
import './gift-card.scss';
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Input, Button, Modal } from 'antd';
import {BrowserRouter as Router,useHistory} from 'react-router-dom'
import {response} from './mock.js'

const columns = [
  {
    title: 'Gift Card No',
    dataIndex: 'id',
    key: 'id',
    responsive: ['md'],
  },
  {
    title: 'Client Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    responsive: ['md'],
  },
  {
    title: 'Email Id',
    dataIndex: 'email',
    key: 'email',
    responsive: ['md'],
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
    responsive: ['lg'],

  },
  {
    title: 'Offer',
    dataIndex: 'offer',
    key: 'offer',
    responsive: ['lg'],
  },
  {
    title: 'Status',
    key: 'tags',
    dataIndex: 'tags',
    responsive: ['lg'],
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

function GiftCards() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const handleHistory = () => {
    history.push("/giftcards")
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
   
    <Router>
    <div className="gift-card-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Gift Cards'}
        />
        <div className={"gift-card"}>
          <Card>
            <div className={'content-body-wrapper'}>
              <div className={'gift-card-inner-wrapper'}>
                <div className={'options-wrapper'}>
                  <div className={'search-wrapper'}>
                    <Input placeholder="Search..." prefix={<SearchOutlined />} />
                  </div>
                  <div className={'primary-btn '} onClick={showModal}>
                    Create New
                  </div>
                </div>
                <Modal visible={isModalVisible} footer={null} closable={false} width={700} style={{ top: 250 }} >
                  <div className="modal-title" style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: ' bolder', fontSize: '18px'
                  }}>Gift Cards-Create</div>
                  <Button className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 25px 0px 25px', marginTop: '-30px' }} onClick={handleHistory}>Save</Button>
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
                      <select style={{ width: 140, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px' }}>

                        <option value="" > </option>
                        <option value="dollar" >$</option>
                        <option value="percentage">%</option>
                      </select>
                    </div>
                  </div>
                </Modal>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </Router>
    
  );
}


export default GiftCards