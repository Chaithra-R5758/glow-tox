import { PageTitle } from '../../components/page-title'
import './promotions.scss';
import { Input, Card, Button, Image,Skeleton } from 'antd';
import { LinkOutlined } from '@ant-design/icons';


const { TextArea } = Input;


function Promotions() {
  return (
    <div className="promotions-screen">
      <div>
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Promotions-Add/Edit'}
          />
          <div className={'content-body-wrapper'}>
            <div className={'promo-addedit-btn'} style={{ padding: '10px 30px' }}>
              Save
            </div>
            <div className={'promo-card-wrapper'}>  
                  <div className={'add-promo-card'}>
                  <Card
                    style={{ width: 600 }}>
                    <Skeleton paragraph={{ rows: 8 }} />
                  </Card>
                  </div></div>
            {/* <div className={'promo-card-wrapper'}>  
                  <div className={'add-promo-card'}>
                    <Card  bordered={false}>
                      
                     <div className={'edit-img-card'}>
                        <Image

                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                      </div>
                      <div className={'add-desc-card'}>
                        <TextArea bordered={false} style={{backgroundColor:"#e4e4e7"}}
                          placeholder=" Description"
                          autoSize={{ minRows: 6, maxRows: 8 }}
                        />
                      </div>
                      <div className="add-btn-card">
                        <Button type="default" shape="round" style={{backgroundColor:" #343557",color:"white"}} >Promo Code </Button>
                      </div>
                      <div className="link-btn-card">
                        <Button type="default" shape="round" style={{backgroundColor:" #343557",color:"white"}} icon={<LinkOutlined />} >URL to Link to Service </Button>
                      </div>
                      
                      </Card>
                  </div>
                
            </div> */}
          </div>
        </div>
      </div>
      </div>
  );
}

export default Promotions;
