import Header from '../../Header'
import Footer from '../../components/footer/'
import Navbar from '../../components/navbar/'
import { PageTitle } from '../../components/page-title/'
import { DASHBOARD_OPTIONS } from '../../constants/';
import './gift-card.scss';
import { Card, Table, Tag, Space,Input } from 'antd';
const { Meta } = Card;
const { Search } = Input;


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
          if (tag === 'loser') {
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
    id:1,
    address: 'New York No. 1 Lake Park',
    tags: ['New',],
    email:'akash@gmail.com',
    offer:'10% off',
    service:'service 1'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    id:2,
    address: 'London No. 1 Lake Park',
    tags: ['Redeemed'],
    email:'hamse@gmail.com',
    offer:'15% off',
    service:'service 1'


  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    id:3,
    address: 'Sidney No. 1 Lake Park',
    tags: ['Redeemed',],
    email:'john@gmail.com',
    offer:'20% off',
    service:'service 1'


  },
];

function Dashboard() {
  return (
    <div className="gift-card-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Gift Cards'}
          />
          <div className={'content-body-wrapper'}>
              <div className={'gift-card-inner-wrapper'}>
                <div className={'options-wrapper'}>
                  <div className={'search-wrapper'}>
                    <Search placeholder="search" 
                    loading ={false}
                    enterButton />
                  </div>
                  <div className={'add-btn'}>
                  Create New
                  </div>
                </div>
                <Table columns={columns} dataSource={data} />
              </div>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;