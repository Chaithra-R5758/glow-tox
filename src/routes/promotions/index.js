import { PageTitle } from "../../components/page-title";
import "./promotions.scss";
import { Input, Card, Skeleton, message, Checkbox } from "antd";
import loginImg from "../../assets/login-img.png";
import { LinkOutlined, EditFilled } from "@ant-design/icons";
import { Modal, Button } from "antd";
import { withRouter } from "react-router-dom";
import React from "react";
import axios from "../../config/api/";
import defaultImg from "../../assets/default.png";
import Error from "../../components/error";
import TextArea from "antd/lib/input/TextArea";
import { handleError } from '../../utils/error-handling/'
import {
  imageToBase64,
  getUserId,
  urltoBase64,
  getExtensionFromUrl,
} from "../../utils/";

const trimName = (name) => name && name.slice(0, 20)

class Promotions extends React.Component {
  constructor() {
    super();
    this.state = {
      loginImg,
      promotion: {},
      promotions: [],
      loading: false,
      error: false,
      promo: {},
      savePromotionLoading: false,
      newPromo: false,
      showError: false,
      services: [],
    };
  }

  getAllPromotions = async () => {
    this.setState({ loading: true });
    const response = await axios.get("promo/getAllPromo");
    const promotions = response.data && response.data.promo;
    if (promotions && promotions.length > 0)
      this.setState({ promotions, loading: false });
  };

  async componentDidMount() {
    this.getAllPromotions();
    this.getAllService()
  }

  onChangeDesc = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        description: e.target.value,
      },
      showError: false,
    }));
  };
  onChangeName = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        promoName: e.target.value,
      },
      showError: false,
    }));
  };

  onChangeCode = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        promoCode: e.target.value,
      },
      showError: false,
    }));
  };

  onChangeOffer = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        promoCode: e.target.value,
      },
      showError: false,
    }));
  };

  onChangeOfferType = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        promoOfferType: e.target.value,
      },
      showError: false,
    }));
  };

  onChangeService = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        serviceId: e.target.value,
      },
      showError: false,
    }));
  };

  onChangeIsActive = e => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        isActive: e.target.checked,
      },
      showError: false,
    }));
  }

  onChangeOffer = (e) => {
    this.setState((prevState) => ({
      promotion: {
        ...prevState.promotion,
        offer: e.target.value,
      },
      showError: false,
    }));
  };
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
    const promoImageFormat = "." + file.type.split("/")[1];
    const base64 = await imageToBase64(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState((prevState) => ({
          promotion: {
            ...prevState.promotion,
            promoImage: base64,
            promoImageFormat,
          },
          showError: false,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  promotionsUI = () => {
    const { loading, error, promotions, promotion } = this.state;
    console.log("promotion", promotion);
    if (loading) {
      return (
        <div className={"promo-card-wrapper"}>
          {["", "", "", "", ""].map((option) => (
            <div className={"promo-card"}>
              <Card style={{ width: 240 }}>
                <Skeleton paragraph={{ rows: 3 }} />
              </Card>
            </div>
          ))}
        </div>
      );
    } else if (error) {
      return <Error title="Something went wrong" />;
    } else if (promotions && promotions.length === 0) {
      return <Error title="0 Service exists" />;
    } else if (promotions && promotions.length > 0) {
      return promotions.map((promotion) => (
        <div className={"promo-card"}>
          <Card bordered={true}
            style={{
              opacity: !promotion.isActive && '.6',
            }}
          >
            <div className="edit-btn-card">
              <Button
                type="link"
                block
                style={{
                  textAlign: "right",
                  color: "#343557",
                  fontSize: "1.5em",
                }}
                onClick={() => promotion.isActive && this.showModal(promotion)}
              >
                {<EditFilled />}
              </Button>
            </div>
            <div className={"promo-name"} style={{}}>
              {
                promotion.promoName ? promotion.promoName : "No Title"
              }
            </div>
            <div className={"img-card"} style={{ backgroundColor: "#D7DBFE" }}>
              <img
                width={150}
                src={promotion.promoImage ? promotion.promoImage : loginImg}
              />
            </div>
            <div className={"desc-card"}>
              <div style={{ flex: "1", alignItems: "center", display: "flex" }}>
                {promotion.description
                  ? promotion.description
                  : "No Description"}
              </div>
              <Button className="btn-card" style={{ cursor: "auto" }}>
             { trimName(promotion.serviceName)|| ''}
              </Button>
            </div>
          </Card>
        </div>
      ));
    }
  };

  savePromotion = async () => {
    const { newPromo, promotion } = this.state;
    if (newPromo) {
      this.addPromo();
    } else {
      this.setState({
        savePromotionLoading: true,
      });
      const {
        recId,
        isActive,
        promoName,
        description,
        promoImage,
        promoImageFormat,
      } = promotion;

      let params = {};
      if (!promoImageFormat) {
        //image has not been changed
        params = {
          recId,
          isActive,
          promoName,
          description,
        };
      } else {
        params = {
          recId,
          isActive,
          promoName,
          description,
          promoImage,
          promoImageFormat,
        };
      }
      
      try {
        const savePromotion = await axios.post("promo/savePromo", params);
        message.success("Data updated successfully!");
      } catch (e) {
        handleError(e)
      }
      this.hideModal();
      this.getAllPromotions();
      this.setState({
        savePromotionLoading: false,
      });
    }
  };

  addPromo = async () => {
    const { promotion } = this.state;
    const {
      description,
      offer,
      promoCode,
      promoImage,
      promoImageFormat,
      promoName,
      promoOfferType,
      serviceId, } = promotion;

    if (description && offer && promoCode && promoImage && promoImageFormat && serviceId && promoName) {
      this.setState({
        savePromotionLoading: true,
      });
      try {
        const { promoOfferType } = promotion;
        const params = {
          promoCode,
          promoName,
          offer:offer+promoOfferType,
          description,
          serviceId,
          promoImage,
          promoImageFormat,
        };
        const addPromo = await axios.post("promo/savePromo", params);
        message.success("Data updated successfully!");
      } catch (e) {
        handleError(e)
        //message.error("Error Occurred!");
      }

      this.setState({
        savePromotionLoading: false,
      });
      this.hideModal();
      this.getAllPromotions();
    } else {
      this.setState({
        showError: true,
      });
    }
  };

  addNewPromo = () => {
    this.setState({
      newPromo: true,
    });
    this.showModal();
    this.getAllService();
  };

  getAllService = async () => {
    try {
      const { data } = await axios.get("service/getAllService");
      const services = data.service;
      this.setState({
        services,
      });
    } catch (e) {
      handleError(e)
     }
  };

  render() {
    const {
      loginImg,
      loadings,
      promotion,
      savePromotionLoading,
      promo,
      showError,
      newPromo,
      services,
    } = this.state;
    return (
      <div className="promotions-screen">
        <div>
          <div className={"content-wrapper"}>
            <PageTitle title={"Promotions"} />
            <div className={"promotions-card"}>
              <Card>
                <div className={"content-body-wrapper"}>
                  <div
                    className={"primary-btn "}
                    onClick={() => this.addNewPromo()}
                  >
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
                centered = {true}
                footer={null}
                width={400}
                style={{ 
                  //top: 40 
                }}
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
                    Promotions {!newPromo ? 'Edit' : 'Add'}
                  </div>
                  <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "16px",
                      margin: '10px 0 0 0',

                    }}>
                    Promo Name
                    <Input
                      disabled={!newPromo}
                      onChange={this.onChangeName}
                      value={(promotion && promotion.promoName) || ""}
                      style={{
                        width: "100%",
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
                      fontSize: "16px",
                      margin: "10px 0 -17px 0",
                    }}
                  >
                    Promo Image
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
                      src={(promotion && promotion.promoImage) || defaultImg}
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
                    }}
                  >
                    Promo Description
                  </div>
                  <TextArea
                    onChange={this.onChangeDesc}
                    value={(promotion && promotion.description) || ""}
                    style={{
                      padding: 10,
                      marginBottom: 10,
                      backgroundColor: "#F6F6F8",
                      borderRadius: "5px",
                    }}
                  />
                  {/* <div
                    className="modal-link"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: " bolder",
                      fontSize: "15px",
                    }}
                  >
                    Offer
                    <Input
                     disabled={!newPromo}
                      onChange={this.onChangeOffer}
                      value={(promotion && promotion.offer) || ""}
                      style={{
                        width: "80%",
                        backgroundColor: " #E2E2E2",
                        blockSize: 30,
                        border: "0px",
                        borderRadius: "5px",
                        marginTop: "5px",
                      }}
                    />
                  </div> */}

                  <div className={"parent-class"} style={{ display: "flex" }}>
                    <div
                      className="modal-link"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "16px",
                      }}
                    >
                      Offer
                      <Input
                        disabled={!newPromo}
                        onChange={this.onChangeOffer}
                        value={(promotion && promotion.offer) || ""}
                        style={{
                          width: "90%",
                          backgroundColor: " #E2E2E2",
                          blockSize: 30,
                          border: "0px",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                    <Input
                      disabled={!newPromo}
                      type="text"
                      list="offer"
                      onChange={this.onChangeOfferType}
                      style={{
                        width: "20%",
                        backgroundColor: " #E2E2E2",
                        blockSize: 30,
                        border: "0px",
                        borderRadius: "5px",
                        marginTop: "25px",
                        marginLeft: '-10px'
                      }}
                    />
                    <datalist id="offer">
                      <option>$</option>
                      <option>%</option>
                    </datalist>

                  </div>
                  <div className={"parent-class"} style={{}}>
                    <div
                      className="modal-link"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "15px",
                        marginTop: '10px'
                      }}
                    >
                      Promo Code
                      <Input
                        onChange={this.onChangeCode}
                        disabled={!newPromo}
                        value={(promotion && promotion.promoCode) || ""}
                        style={{
                          //width: "80%",
                          backgroundColor: " #E2E2E2",
                          blockSize: 30,
                          border: "0px",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                    <div
                      className="modal-code"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: " bolder",
                        fontSize: "16px",
                        marginTop: '10px'
                      }}>
                      Service Name
                      <select
                        id="option"
                        disabled={!newPromo}
                        onChange={this.onChangeService}
                        type="text"
                        list="option"
                        value={(promotion && promotion.serviceId) || ""}
                        style={{
                          // backgroundColor: " #E2E2E2",
                          // blockSize: 30,
                          // border: "0px",
                          // borderRadius: "5px",
                          // marginTop: "-2px",

                          width: '100%',
                          backgroundColor: " #E2E2E2",
                          blockSize: 30,
                          border: "0px",
                          borderRadius: "5px",
                          marginBottom:!newPromo ? "0" : "30px"
                        }}

                      // onChange={e => setServiceId(e.target.value, setShowError(false))}
                      //  placeholder="Service Name"
                      //disabled={!newGiftCard}
                      //value={serviceId || ""}
                      // style={{
                      //   width:300,
                      //   backgroundColor: " #E2E2E2",
                      //   blockSize: 40,
                      //   border: "0px",
                      //   borderRadius: "5px",
                      //  }}
                      >
                        {newPromo && <option value={''}></option> }
                        {services.map(
                          (service) =>
                            service.isActive && (
                              <option value={service.recId}>{service.serviceName}</option>
                            )
                        )}
                      </select>
                      
                      {!newPromo &&
                        <div className={'promo-isActive'}>
                          <Checkbox
                            style={{
                              marginTop: 25,
                             // marginLeft: -150,
                              //   width: "50%",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: " bolder",
                              fontSize: "12px",
                            }}
                            checked={promotion && promotion.isActive}
                            onChange={e => this.onChangeIsActive(e)}
                          >
                            IsActive
                        </Checkbox>
                        </div>
                      }
                      </div>
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
                          margin: !newPromo ? "-25px 0" : "-15px 0",
                        }}
                      >
                        Save
                      </Button>
                      
                    
                  </div>
                </div>
                {showError && (
                  <div
                    style={{
                      color: "red",
                      textAlign: "center",
                      margin: "5px 0 -15px 0",
                    }}
                  >
                    All the fields are mandatory
                  </div>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Promotions);
