import React from 'react';
import { withRouter, } from "react-router-dom";
import { PageTitle } from '../../components/page-title/'
import { DASHBOARD_OPTIONS } from '../../constants/';
import './dashboard.scss';
import { Card } from 'antd';
const { Meta } = Card;

class Dashboard extends React.Component {

  itemClicked = (index) => {
    switch (index) {
      case 0: this.props.history.push('/services')
        break;
      case 1: this.props.history.push('/promotions')
        break;
      case 2: this.props.history.push('/servicehistory')
        break;
      case 3: this.props.history.push('/giftcards')
        break;
      default: break;
    }
  }

  render() {
    return (
      <div className="dashboard-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Dashboard'}
          />
          <div
            className={'content-body-wrapper'}>
            {
              DASHBOARD_OPTIONS.map((option, index) =>
                <div className={'dashboard-card'}
                  onClick={() => this.itemClicked(index)}>
                  <Card
                    hoverable
                    style={{ width: 240 }}>
                    <Meta title={option.title}
                      description={option.desc}/>
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