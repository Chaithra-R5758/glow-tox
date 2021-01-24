import { PageTitle } from '../../components/page-title'
import './promotions.scss';
import { Input, Card,Skeleton } from 'antd';
import loginImg from '../../assets/login-img.png'
import { LinkOutlined, EditFilled } from '@ant-design/icons';
import { Modal, Button} from 'antd';
import { response } from './mock.js'
import { responseId } from './mock-id.js'
import { withRouter } from 'react-router-dom';
import React from 'react';


class Promotions extends React.Component {
  state = {
    loginImg,
    loadings: [] 
  };
  // state = { visible: true };
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  imageHandler = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ loginImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };
 render(){
  const { loginImg } = this.state;
  const { loadings } = this.state;
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
            <div className={'primary-btn '} onClick={this.showModal}>
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
                response.promotion
                .map(promotion =>
                  <div className={'promo-card'}>
                    <Card bordered={true}>
                      <div className="edit-btn-card">
                        <Button type="link" block style={{ textAlign: "right", color: "#343557" ,fontSize:'1.5em'}} onClick={this.showModal}>
                          {<EditFilled/>}
                        </Button>
                        <Modal   
          visible={this.state.visible}
          onCancel={this.hideModal} footer={null} width={400 } style={{ top: 80}} >
                <div className={'add-promo-card'}>
                    <div className="modal-title" style={{fontFamily:"Poppins, sans-serif",
        fontWeight:' bolder', fontSize:'18px',marginTop:-10}}>Promotions Edit</div>   
                    <div className={'modal-img-card'} style={{  backgroundColor: ' #E2E2E2',height:150,marginTop:20 ,marginBottom:10}}>
                    <label  htmlFor="input"><i type="link"  style={{marginLeft:300, color: "#343557" ,fontSize:'1.5em'}}>
                    {<EditFilled/>}
                    </i>
                    </label>
                    <img  src={loginImg} alt="" id="img" className="img" style={{width: 160, height:130,objectFit:'cover', transform:'translateX(60%) translateY(-20%)'}}/>
                        </div>
                        
                        <input style={{display:'none'}}
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
          />
                    
                     
                    
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
                       
                       <Input  value={responseId.promotion.promoCode || ''} style={{width:'80%',backgroundColor: ' #E2E2E2',blockSize:30,border:'0px',borderRadius:'5px',marginTop:'5px'}}/>
                    
                    </div>
                    <div className="modal-code" style={{fontFamily:"Poppins, sans-serif",
        fontWeight:' bolder', fontSize:'15px'}}>
                      Link to Services
                    <Input value={responseId.promotion.service || ''}  style={{backgroundColor: ' #E2E2E2',blockSize:30,border:'0px',borderRadius:'5px',marginTop:'5px'}}/>
                    <Button loading={loadings[1]}
          onClick={() => this.enterLoading(1)}
        className="save-btn" style={{float:'right', backgroundColor: '#5D72E9',color:'white',borderRadius:'5px',padding:' 0px 25px',marginTop:'20px'}}>Save</Button> </div>
                    </div>
               
                </div>
               
              </Modal>
                      </div>

                      <div className={'img-card'} style={{backgroundColor:'#D7DBFE'}}>
                        <img width={150}
                          src={promotion.promoImage ? promotion.promoImage:loginImg}
                        />
                      </div>
                      <div className={'desc-card'}>
                        {promotion.description ? promotion.description : 'No Description'}
                      </div>
                        <Button className="btn-card" onClick={this.showModal} icon={<LinkOutlined />} >Link to Services </Button>

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
}
export default withRouter(Promotions);