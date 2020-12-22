import { PageTitle } from '../../components/page-title'
import './service-history.scss';
import brandIcon from '../../assets/brand-logo.png'
import { Card, Form, Input, Select,Skeleton } from 'antd';
const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

function ServiceHistory() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <div className="service-history-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Service History - View'}
        />
        {/* <div className={'service-history-wrapper'}>
          <div className={'service-view-wrapper'}>
            <div className={'card-wrapper'}>
            <Card
                    style={{ width: 300}}>
                    <Skeleton paragraph={{ rows: 8 }} />
                  </Card>
                  </div>
                  
            <div className={'card-wrapper'}>  
            <Card
                    style={{ width: 300}}>
                    <Skeleton paragraph={{ rows: 8 }} />
                  </Card>
                  </div> 
                  </div>
  </div>*/}<div className={'service-history-wrapper'}> 
          <div className={'service-view-wrapper'}>
            <div className={'card-wrapper'}>
            <Card>
              <div className={'client-details-wrapper'}>
                <img className={'client-img'} alt="example" 
                src={brandIcon} />
                <div className={'client-form-wrapper'}>
                  <Form>
                    <Form.Item label="   Full Name">
                      <Input value="Akash hamse" />
                    </Form.Item>
                    <Form.Item label="Loyalty points">
                      <Input value="100" />
                    </Form.Item>
                    <Form.Item label="    Email Id">
                      <Input value="akashhamse@gmail.com" />
                    </Form.Item>
                    <Form.Item label="Mobile Number">
                      <Input value="8884785784" />
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Card>
            </div>
             
            <div className={'card-wrapper'}>
            <Card>  
              <div className={'client-details-wrapper'}>
                <img className={'client-img'} alt="example" 
                src={brandIcon} />
                <div className={'client-form-wrapper'}>
                  <Form>
                    <Form.Item label="Transaction Id">
                      <Input value="we1234" />
                    </Form.Item>
                    <Form.Item label="Service Name">
                      <Input value="s123" />
                    </Form.Item>
                    <Form.Item label="Price">
                      <Input value="$ 100" />
                    </Form.Item>
                    <Form.Item label="Promo Name">
                      <Input value="testing_ui" />
                    </Form.Item>
                    <Form.Item label="Status">
                      <Input value="Completed" />
                    </Form.Item>
                  </Form>
                </div>
              </div>
            
            </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceHistory;