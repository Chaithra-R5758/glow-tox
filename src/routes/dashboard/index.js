import { PageTitle } from '../../components/page-title/'
import { DASHBOARD_OPTIONS } from '../../constants/';
import './dashboard.scss';
import { Card } from 'antd';
const { Meta } = Card;

function Dashboard() {
  return (
    <div className="dashboard-screen">
      
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Dashboard'}
          />
          <div className={'content-body-wrapper'}>
            {
              DASHBOARD_OPTIONS.map(option =>
                <div className={'dashboard-card'}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    >
                    <Meta title={option}
                      description="www.instagram.com"
                    />
                  </Card>
                </div>
              )
            }
          </div>
        </div>
      
      
    </div>
  );
}

export default Dashboard;
