import React, { Component, Suspense } from 'react';
import { withRouter } from "react-router-dom";
import { PageTitle } from '../../components/page-title/'
import { DASHBOARD_OPTIONS } from '../../constants/';
import './gift-card.scss';
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Space, Input, Anchor, Button, Pagination } from 'antd';
const { Meta } = Card;
const { Search } = Input;
const { Link } = Anchor;



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
for (let i = 6; i < 100; i++) {
  data.push({


    key: 'i',
    name: `John Brown ${i}`,
    age: 32,
    id: i,
    address: `New York No.${i} Lake Park`,
    tags: ['New'],
    email: 'akash@gmail.com',
    offer: '10% off',
    service: `service ${i}`

  });


}
class GiftCard extends Component {
  render() {
    return (
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
                    <div className={'primary-btn '} onClick={() => this.props.history.push('/giftcardscreate')}>
                      Create New
                  {/* <Anchor affix={false}><Link href="/giftcardscreate" title="Create New" /></Anchor> */}
                    </div>
                  </div>
                  <Table columns={columns} dataSource={data} />

                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(GiftCard)