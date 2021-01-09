import { PageTitle } from '../../components/page-title'
import loginImg from '../../assets/login-img.png'
import './service.scss';
import { Card, Button, template, Skeleton ,Anchor} from 'antd';
import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
const { Meta } = Card;


const { Link } = Anchor;

class Service extends Component { 
  render(){
  return (
    <div className="service-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Service'}
        />
        <div className={"service-card"}>
          <Card>
        <div className={'content-body-wrapper'}>
          <div className={'primary-btn'} onClick={() => this.props.history.push('/Servicesadd')}>
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
              ["","","","","",""].map(option =>
                
                <div className={'dashboard-card'}>
                  <Card
                    hoverable
                    style={{ width: '190px' }}
                    cover={<img alt="example" src={loginImg}  style={{height:'160px',backgroundColor:'#EFF2F7', position:'relative',borderRadius:'0 0 50% 50%/0 0 15% 15%'}}/>}>
                    <div className={'service-card-body-wrapper'}>
                      <div className={'service-meta-data-wrapper'}>
                        <Meta title="Service Name" />
                        <div className={'edit-btn'} onClick={() => this.props.history.push('/Servicesadd')}>Edit</div>
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
        </Card>
        </div>
      </div>
    </div>
  );
}
}

export default withRouter(Service);
