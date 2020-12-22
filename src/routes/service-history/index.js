import Header from '../../Header'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import { PageTitle } from '../../components/page-title'
import { DASHBOARD_OPTIONS } from '../../constants';
import './service-history.scss';
import { Card, Table, Tag, Button, Input ,Skeleton,Anchor} from 'antd';
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
  {
    title: '',
    dataIndex: 'btn',
    key: 'btn',
    render: text => <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }}> <div className="view-btn" onClick={() => this.props.history.push('/Servicehistoryview')}>View</div></Button>
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    id: 1,
    address: 'New York No. 1 Lake Park',
    tags: ['Scheduled',],
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
    tags: ['Scheduled'],
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
    tags: ['Purchased',],
    email: 'john@gmail.com',
    offer: '20% off',
    service: 'service 1',
    promoname: 'Promo Details',
  },
];

function ServiceHistory() {
  return (
    <div className="service-history-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Service History'}
        />
        <div className={'service-history-wrapper'}>
          <div className={'gift-card-inner-wrapper'}>
            <div className={'search-wrapper'} >
              <Search placeholder="search" 
             loading={false}
                enterButton  />
            </div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceHistory;