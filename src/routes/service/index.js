import { PageTitle } from '../../components/page-title'
import testImg from '../../assets/test-img.jpg'
import './service.scss';
import { Card, Button, template, Skeleton ,Anchor} from 'antd';
const { Meta } = Card;


const { Link } = Anchor;

function Service() {
  return (
    <div className="service-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Service'}
        />
        <div className={'content-body-wrapper'}>
          <div className={'add-btn'} onClick={() => this.props.history.push('/Serviceadd')}>
          Add New Service
            </div>
          <div className={'dashboard-card-wrapper'}>
            {/* {
              ["", "", "", "", ""].map(option =>
                <div className={'dashboard-card'}>
                  <Card
                    style={{ width: 240 }}>
                    <Skeleton paragraph={{ rows: 3 }} />
                  </Card>
                </div>
              )
            } */}
            {
              ["","","","",""].map(option =>
                <div className={'dashboard-card'}>
                  <Card
                    hoverable
                    style={{ width: '200px' }}
                    cover={<img alt="example" src={testImg} />}>
                    <div className={'service-card-body-wrapper'}>
                      <div className={'service-meta-data-wrapper'}>
                        <Meta title="Service 1" />
                        <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }}>Edit</Button>
                      </div>
                      <div>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
