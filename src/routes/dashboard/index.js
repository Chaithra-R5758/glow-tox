import React from 'react';
import { withRouter, } from "react-router-dom";
import { PageTitle } from '../../components/page-title/'
import { DASHBOARD_OPTIONS } from '../../constants/';
import './dashboard.scss';
import { Card } from 'antd';
const { Meta } = Card;

class Dashboard extends React.Component {

  // componentDidMount(){
  //   window.location.reload();
  // }

  render(){
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
                    <Meta title={option.title}
                      description={option.desc}
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
}
export default withRouter(Dashboard)