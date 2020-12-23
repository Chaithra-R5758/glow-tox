import { PageTitle } from '../../components/page-title'
import './promotions.scss';
import { Input, Card, Image,Skeleton } from 'antd';
import { LinkOutlined, EditOutlined } from '@ant-design/icons';
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
          <div className={'content-body-wrapper'}>
            <div className={'promo-primary-btn'}>
              <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white",paddingTop:'5px' }} onClick={showModal}>
                Add New Promo
      </Button>
              <Modal title="Promotions-Add/Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} >
                <div className={'add-promo-card'}>
                  <Card bordered={false}>

                    <div className={'modal-img-card'} style={{ width: 180, marginBottom: 10, marginTop: -15 }}>
                      <Image

                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </div>
                    <div className={'modal-desc-card'} style={{ marginBottom: 10 }} >
                      <TextArea bordered={false} style={{ backgroundColor: "#e4e4e7" }}
                        placeholder=" Description"
                        autoSize={{ minRows: 6, maxRows: 8 }}
                      />
                    </div>
                    <div className="modaladd-btn-card" >
                      <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }} >Promo Code </Button>
                    </div>
                    <div className="modallink-btn-card">
                      <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }} icon={<LinkOutlined />} >URL to Link to Service </Button>
                    </div>

                  </Card>
                </div>
              </Modal>
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
                ["", "", "", "", ""].map(option =>
                  <div className={'promo-card'}>
                    <Card bordered={false}>
                      <div className="edit-btn-card">
                        <Button type="link" block style={{ textAlign: "right", color: "#343557" }} onClick={showModal}>
                          {<EditOutlined />}
                        </Button>
                        <Modal title="Promotions-Add/Edit" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} >
                          <div className={'add-promo-card'}>
                            <Card bordered={false}>

                              <div className={'modal-img-card'} style={{ width: 180, marginBottom: 10, marginTop: -15 }}>
                                <Image

                                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                              </div>
                              <div className={'modal-desc-card'} style={{ marginBottom: 10 }} >
                                <TextArea bordered={false} style={{ backgroundColor: "#e4e4e7" }}
                                  placeholder=" Description"
                                  autoSize={{ minRows: 6, maxRows: 8 }}
                                />
                              </div>
                              <div className="modaladd-btn-card" >
                                <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }} >Promo Code </Button>
                              </div>
                              <div className="modallink-btn-card">
                                <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }} icon={<LinkOutlined />} >URL to Link to Service </Button>
                              </div>

                            </Card>
                          </div>
                        </Modal>
                      </div>

                      <div className={'img-card'}>
                        <Image

                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                      </div>
                      <div className={'desc-card'}>
                        <TextArea bordered={false} style={{ backgroundColor: "#e4e4e7" }}
                          placeholder="Promo Description"
                          autoSize={{ minRows: 5, maxRows: 8 }}
                        />
                      </div>
                      <div className="btn-card">
                        <Button type="default" shape="round" style={{ backgroundColor: " #343557", color: "white" }} icon={<LinkOutlined />} >Link to Services </Button>
                      </div>

                    </Card>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotions;
