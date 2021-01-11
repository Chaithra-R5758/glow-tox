import Header from '../../Header'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import { PageTitle } from '../../components/page-title'
import { DASHBOARD_OPTIONS } from '../../constants';
import './service-history.scss';
import { Card, Table, Tag, Button, Input, Skeleton, Anchor } from 'antd';
import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons'
const { Meta } = Card;
const { Search } = Input;


const { Link } = Anchor;

const columns = [
  {
    title: 'Transaction Id',
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
    render: text => <div className="view-btn" onClick={() => { }}>View</div>
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    id: 1,
    address: 'New York No. 1 Lake Park',
    tags: ['paid',],
    email: 'akash@gmail.com',
    offer: '10% off',
    service: 'service 1',
    promoname: 'No',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    id: 2,
    address: 'London No. 1 Lake Park',
    tags: ['chargeback'],
    email: 'hamse@gmail.com',
    offer: '15% off',
    service: 'service 1',
    promoname: 'Promo Details',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    id: 3,
    address: 'Sidney No. 1 Lake Park',
    tags: ['Refund'],
    email: 'john@gmail.com',
    offer: '20% off',
    service: 'service 1',
    promoname: 'Promo Details',
  },
  {
    key: '4',
    name: 'Ronald Taylo',
    age: 32,
    id: 4,
    address: 'Sidney No. 1 Lake Park',
    tags: ['paid'],
    email: 'ronald@gmail.com',
    offer: '20% off',
    service: 'service 1',
    promoname: 'Promo Details',
  },
];
for (let i = 5; i < 100; i++) {
  data.push({


    key: 'i',
    name: `John Brown ${i}`,
    age: 32,
    id: i,
    address: `New York No.${i} Lake Park`,
    tags: ['New'],
    email: 'akash@gmail.com',
    offer: '10% off',
    service: `service ${i}`,
    promoname: 'Promo Details',

  });
}

class ServiceHistory extends Component {
  render() {
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
                    <Input placeholder="Search..." prefix={<SearchOutlined />} />
                  </div>
                  <Table dataSource={data} columns={columns} />
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