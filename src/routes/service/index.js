import Header from '../../Header'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import { PageTitle } from '../../components/page-title'
import { DASHBOARD_OPTIONS } from '../../constants';
import './service.scss';
import { Card, Button } from 'antd';
const { Meta } = Card;

function Service() {
  return (
    <div className="service-screen">
      <Header />
      <div>
        <Navbar />
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
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <div className={'service-card-body-wrapper'}>
                      <div className={'service-card-title'}>
                      <Meta title="Europe Street beat" />
                      </div>
                    <Button type="primary">Primary Button</Button>
                    </div>
                    
                  </Card>
                </div>
              )
            }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Service;
