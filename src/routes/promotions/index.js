import { PageTitle } from '../../components/page-title'
import './promotions.scss';
import { Input, Card, Image,Skeleton } from 'antd';
import loginImg from '../../assets/login-img.png'
import { LinkOutlined, EditFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const { TextArea } = Input;


function Promotions() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="promotions-screen">
      <div>
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Promotions'}
          />
          
          <div className={"promotions-card"}>
          <Card>
          <div className={'content-body-wrapper'}>
            <div className={'primary-btn '} >
            Add Promo
            </div>
              
        
            {/* <div className={'promo-card-wrapper'}>
            {
              ["", "", "", "", ""].map(option =>
                <div className={'promo-card'}>
                  <Card
                    style={{ width: 240 }}>
                    <Skeleton paragraph={{ rows: 3 }} />
                  </Card>
                </div>
              )
            }
            </div> */}
            <div className={'promo-card-wrapper'}>
              {
                ["", "", "", ""].map(option =>
                  <div className={'promo-card'}>
                    <Card bordered={true}>
                      <div className="edit-btn-card">
                        <Button type="link" block style={{ textAlign: "right", color: "#343557" ,fontSize:'1.5em'}} onClick={showModal}>
                          {<EditFilled/>}
                        </Button>
                        <Modal   visible={isModalVisible} onOk={handleOk}footer={null} closable={false} onCancel={handleCancel}width={400 } style={{ top: 80}} >
                <div className={'add-promo-card'}>
                 
                    <div className="modal-title" style={{fontFamily:"Poppins, sans-serif",
        fontWeight:' bolder', fontSize:'18px'}}>Promotions Edit</div>
        <Button className="save-btn" style={{float:'right', backgroundColor: '#5D72E9',color:'white',borderRadius:'5px',padding:'0px 25px 0px 25px',marginTop:'-30px'}}>Save</Button>

                    
                    
                    <div className={'modal-img-card'} style={{  backgroundColor: ' #E2E2E2',height:150,marginTop:20 ,marginBottom:10}}>
                    <Button type="link" block style={{ textAlign: "right", color: "#343557" ,fontSize:'1.5em'}}>
                    {<EditFilled/>}
                    </Button>
                    <Image  style={{width:160,transform:'translateX(60%) translateY(-30%) '}}
                        src={loginImg} />
                    
                    
                     
                    </div>
                    <div className="modal-code" style={{fontFamily:"Poppins, sans-serif",
        fontWeight:' bolder', fontSize:'16px',marginBottom:'5px'}}> 
                    Description</div>
        <div className={'modal-desc-card'} style={{ padding:10,marginBottom: 10 ,backgroundColor:'#F6F6F8',borderRadius:'5px'}} >
                    The item is what you purchase from Envato Market. The end pro­­duct 
                        is what you build with that item. Example: The item is a business 
                      card template: the end product is th finalized business card.
                    </div>
                    <div className={"parent-class"} style={{display:'flex'}}>
                    <div className="modal-link" style={{fontFamily:"Poppins, sans-serif",
        fontWeight:' bolder', fontSize:'15px'}}>
                       Promo Code
                       
                       <input maxLength={5} style={{width:'80%',backgroundColor: ' #E2E2E2',blockSize:30,border:'0px',borderRadius:'5px',marginTop:'5px'}}/>
                    
                    </div>
                    <div className="modal-code" style={{fontFamily:"Poppins, sans-serif",
        fontWeight:' bolder', fontSize:'15px'}}>
                      Link to Services
                    <input style={{backgroundColor: ' #E2E2E2',blockSize:30,border:'0px',borderRadius:'5px',marginTop:'5px'}}/>
                    </div>
                    </div>

                 
                </div>
              </Modal>
                      </div>

                      <div className={'img-card'} style={{backgroundColor:'#D7DBFE'}}>
                        <Image

                          src={loginImg}
                        />
                      </div>
                      <div className={'desc-card'}>
                        
                        The item is what you purchase from Envato Market. The end pro­­duct 
                        is what you build with that item. Example: The item is a business 
                      card template: the end product is th finalized business card.
                       
                      </div>
                        <Button className="btn-card" icon={<LinkOutlined />} >Link to Services </Button>

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
    </div>
  );
}

export default Promotions;
