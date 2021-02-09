import { PageTitle } from "../../components/page-title";
import "./promotions.scss";
import { Input, Card, Skeleton, message } from "antd";
import loginImg from "../../assets/login-img.png";
import { LinkOutlined, EditFilled } from "@ant-design/icons";
import { Modal, Button } from "antd";
import { withRouter } from "react-router-dom";
import React from "react";
import axios from "../../config/api/";
import defaultImg from "../../assets/default.png";
import Error from "../../components/error";
import TextArea from "antd/lib/input/TextArea";
import { imageToBase64, getUserId, urltoBase64, getExtensionFromUrl } from '../../utils/'

class Promotions extends React.Component {
  constructor() {
    super()
    this.state = {
      loginImg,
      promotion: {},
      promotions: [],
      loading: false,
      error: false,
      promo: {},
      savePromotionLoading: false,
      newPromo: false,
      showError: false
    };
  }

  getAllPromotions = async () => {
    this.setState({ loading: true })
    const response = await axios.get('promo/getAllPromo',)
    const promotions = response.data && response.data.promo
    if (promotions && promotions.length > 0)
      this.setState({ promotions, loading: false })
  }

  async componentDidMount() {
    this.getAllPromotions()
  }

  onChangeLink = e => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        service: e.target.value
      },
      showError: false
    }))
  }

  onChangeCode = e => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        promoCode: e.target.value
      },
      showError: false
    }))
  }

  onChangeDesc = e => {
    this.setState(prevState => ({
      promotion: {
        ...prevState.promotion,
        description: e.target.value
      },
      showError: false
    }))
  }

  showModal = (promotion = {}) => {
    this.setState({
      visible: true,
      promotion,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      newPromo: false,
    });
  };

  imageHandler = async (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const promoImageFormat = '.' + file.type.split('/')[1]
    const base64 = await imageToBase64(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState(prevState => ({
          promotion: {
            ...prevState.promotion,
            promoImage: base64,
            promoImageFormat
          },
          showError: false
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  promotionsUI = () => {
    const { loading, error, promotions, promotion } = this.state;
    console.log("promotion", promotion)
    if (loading) {
      return (
        <div className={'promo-card-wrapper'}>
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
        </div>
      )
    } else if (error) {
      return <Error title="Something went wrong" />;
    } else if (
      promotions &&
      promotions.length === 0
    ) {
      return <Error title="0 Service exists" />;
    } else if (
      promotions &&
      promotions.length > 0
    ) {
      return promotions.map((promotion) => (
        <div className={"promo-card"}>
          <Card bordered={true}>
            <div className="edit-btn-card">
              <Button
                type="link"
                block
                style={{
                  textAlign: "right",
                  color: "#343557",
                  fontSize: "1.5em",
                }}
                onClick={() => this.showModal(promotion)}
              >
                {<EditFilled />}
              </Button>
            </div>
            <div className={"img-card"} style={{ backgroundColor: "#D7DBFE" }}>
              <img
                width={150}
                src={promotion.promoImage ? promotion.promoImage : loginImg}
              />
            </div>
            <div className={"desc-card"}>
              <div style={{flex: '1',
    alignItems: 'center',
    display: 'flex'}}>
                {promotion.description ? promotion.description : "No Description"}
              </div>
              <Button
              className="btn-card"
              onClick={this.showModal}
              icon={<LinkOutlined />}>
              Link to Services{" "}
            </Button>
            </div>
            
          </Card>
        </div>
      )
      )
    }
  };

  savePromotion = async () => {
    const { newPromo, promotion } = this.state
    if (newPromo) {
      this.addPromo()
    }
    else {
      this.setState({
        savePromotionLoading: true,
      });
      const { 
        recId, 
        isActive,
        promoName,
        description,
        promoImage,
        promoImageFormat } = promotion

      let params = {}
      if (!promoImageFormat) {
        //image has not been changed
        params = {
          recId, 
          isActive,
          promoName,
          description,
        }
      }
      else {
        params = {
          recId, 
          isActive,
          promoName,
          description,
          promoImage,
          promoImageFormat
        }
      }
      try {
        const savePromotion = await axios.post("promo/savePromo", params);
        message.success('Data updated successfully!');
      } catch (e) {
        message.error('Error Occurred!');
      }
      this.hideModal()
      this.getAllPromotions()
      this.setState({
        savePromotionLoading: false,
      });
    }
  }

  addPromo = async () => {
    const { promotion } = this.state
    const { description, promoCode, promoImage, service } = promotion
    if (description && promoCode && promoImage && service) {
      this.setState({
        savePromotionLoading: true,
      });
      try {
        const {
          promoCode,
          promoName,
          description,
          service,
          offer,
          promoImage,
          promoImageFormat,
        } = promotion

        const params = {
          promoCode,
          promoName: promoCode,
          offer: '10%',
          description,
          serviceId: service,
          promoImage,
          promoImageFormat,
        }
        const addPromo = await axios.post("promo/savePromo", params);
        message.success('Data updated successfully!');
      } catch (e) {
        message.error('Error Occurred!');
      }

      this.setState({
        savePromotionLoading: false,
      })
      this.hideModal()
      this.getAllPromotions()
    }
    else {
      this.setState({
        showError: true
      })
    }
  }

  addNewPromo = () => {
    this.setState({
      newPromo: true
    })
    this.showModal()
  }

  render() {
    const { loginImg, loadings, promotion, savePromotionLoading, promo, showError } = this.state;
    return (
      <div className="promotions-screen">
        <div>
          <div className={"content-wrapper"}>
            <PageTitle title={"Promotions"} />
            <div className={"promotions-card"}>
              <Card>
                <div className={"content-body-wrapper"}>
                  <div className={"primary-btn "} onClick={() => this.addNewPromo()}>
                    Add Promo
                  </div>
                  <div className={"promo-card-wrapper"}>
                    {this.promotionsUI()}
                  </div>
                </div>
              </Card>
              <Modal
                visible={this.state.visible}
                onCancel={this.hideModal}
                footer={null}
                width={400}
                style={{ top: 80 }}
              >
                <div className={"add-promo-card"}>
                  <div
                    className="modal-title"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "18px",
                      marginTop: -10,
                    }}
                  >
                    Promotions Edit
                  </div>
                  <div
                    className={"modal-img-card"}
                    style={{
                      backgroundColor: " #E2E2E2",
                      height: 150,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  >
                    <label htmlFor="input">
                      <i
                        type="link"
                        style={{
                          marginLeft: 260,
                          color: "#343557",
                          fontSize: "1.5em",
                        }}
                      >
                        {<EditFilled />}
                      </i>
                    </label>
                    <img
                      src={promotion && promotion.promoImage || defaultImg}
                      alt=""
                      id="img"
                      className="img"
                      style={{
                        width: 160,
                        height: 130,
                        objectFit: "cover",
                        transform: "translateX(60%) translateY(-20%)",
                      }}
                    />
                  </div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input"
                    onChange={(e) => this.imageHandler(e)}
                  />
                  <div
                    className="modal-code"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}>
                    Description
                  </div>
                  <TextArea
                    onChange={this.onChangeDesc}
                    value={promotion && promotion.description || ''}
                    style={{
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: "#F6F6F8",
                      borderRadius: "5px",
                    }}
                  />
                  <div className={"parent-class"} style={{ display: "flex" }}>
                    <div
                      className="modal-link"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                      }}
                    >
                      Promo Code
                      <Input
                        onChange={this.onChangeCode}
                        value={promotion && promotion.promoCode || ''}
                        style={{
                          width: "80%",
                          backgroundColor: " #E2E2E2",
                          blockSize: 30,
                          border: "0px",
                          borderRadius: "5px",
                          marginTop: "5px",
                        }}
                      />
                    </div>
                    <div
                      className="modal-code"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                      }}
                    >
                      Link to Services
                      <Input
                        onChange={this.onChangeLink}
                        value={promotion && promotion.service || ''}
                        style={{
                          backgroundColor: " #E2E2E2",
                          blockSize: 30,
                          border: "0px",
                          borderRadius: "5px",
                          marginTop: "5px",
                        }}
                      />
                      <Button
                        loading={savePromotionLoading}
                        //onClick={() => this.addPromo(promo)}
                        onClick={() => this.savePromotion(promotion)}
                        className="save-btn"
                        style={{
                          float: "right",
                          backgroundColor: "#5D72E9",
                          color: "white",
                          borderRadius: "5px",
                          padding: " 0px 25px",
                          marginTop: "20px",
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
                {showError && <div style={{
                  color: 'red',
                  textAlign: 'center',
                  margin: '5px 0 -15px 0'
                }}>All the fields are mandatory</div>}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Promotions);
