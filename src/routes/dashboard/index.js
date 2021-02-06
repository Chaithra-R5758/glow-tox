//import React from 'react';
//import { withRouter, } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { PageTitle } from '../../components/page-title/'
import { DASHBOARD_OPTIONS } from '../../constants/';
import './dashboard.scss';
import { Card } from 'antd';
const { Meta } = Card;

const ItemClicked = (index, history) => {
  switch (index) {
    case 0: history.push({ pathname:  "/services" });
      break;
    case 1: history.push({ pathname:  "/promotions" });
      break;
    case 2: history.push({ pathname:  "/servicehistory" });
      break;
    case 3: history.push({ pathname:  "/giftcards" });
      break;
    default: break;
  }
}

const Dashboard = () => {
  const history = useHistory();
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
              <div 
                key={index}
                className={'dashboard-card'}
                onClick={() => ItemClicked(index, history)} >
                <Card
                  hoverable style={option.color}>
                  {option.img}
                  <Meta
                    title={option.title}
                    description={option.desc} />
                </Card>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
export default Dashboard