import { PageTitle } from '../../components/page-title'
import testImg from '../../assets/test-img.jpg'
import './service.scss';
import { Card, Button } from 'antd';
const { Meta } = Card;

function Service() {
  return (
    <div className="service-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service'}
          />
          <div className={'content-body-wrapper'}>
            <div className={'service-add-btn'}>
              Add New Service
            </div>
            <div className={'dashboard-card-wrapper'}>
            {
              ["","","","",""].map(option =>
                <div className={'dashboard-card'}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={testImg} />}>
                    <div className={'service-card-body-wrapper'}>
                      <div className={'service-meta-data-wrapper'}>
                        <Meta title="Service 1" />
                        <Button type="primary">Edit</Button>
                      </div>
                      <div>
                        
                      </div>
                      {/* <div className={'service-card-title'}>
                      <Meta title="Service 1" />
                      </div>
                    <Button type="primary">Edit</Button> */}
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
