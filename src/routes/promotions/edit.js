import { PageTitle } from '../../components/page-title'
import './promotions.scss';
import { Input, Card, Button, Image } from 'antd';
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
            <div className={'promo-addedit-btn'}>
            <Button type="default" shape="round" style={{backgroundColor:" #343557",color:"white"}}>
              save
              </Button>
            </div>
            <div className={'promo-card-wrapper'}>


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

            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Promotions;