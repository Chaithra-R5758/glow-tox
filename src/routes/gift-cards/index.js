import React, { useState, useEffect } from 'react';
import { PageTitle } from '../../components/page-title/'
import './gift-card.scss';
import axios from '../../config/api/'
import { SearchOutlined } from '@ant-design/icons'
import { Card, Table, Tag, Input, Button, Modal, Skeleton, message } from 'antd';

const GiftCards = () => {

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [giftcard, setGiftcard] = useState({})
  const [giftCards, setGiftCards] = useState([])
  const [searchText, setSearchText] = useState('')
  const [giftCardSearchResult, setGiftCardSearchResult] = useState([])
  const [saveGiftcardLoading, setSaveGiftcardLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [clientName, setClientName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [offer, setOffer] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [showError,setShowError]=useState(false)

  const getAllGiftCards = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get('gift/getAllGift',)
      setIsLoading(false)
      const giftCards = (data && data.gift) || ''
      if (giftCards.length >= 0) {
        setGiftCards(giftCards)
      }
    } catch (e) {
      setIsError(true)
    }
  }

  useEffect(() => {
    getAllGiftCards()
  }, []);

  const saveGiftcard = async () => {
    const {clientName,emailId,offer,serviceId}= giftcard
    if(clientName && emailId && offer && serviceId) {
    setSaveGiftcardLoading(true)
   try{
    const saveGiftcard = await axios.post('gift/saveGift',
      {
        clientName,
        clientEmailId:emailId,
        offer,
        serviceId,
      });
      message.success('Data updated successfully!');
    } catch (e) {
      message.error('Error Occurred!');
    }
    
    setSaveGiftcardLoading(false)
    hideModal()
    getAllGiftCards()
  }else{
    setShowError(true)
  }
  
}

  const showModal = () => {
    setVisible(true)
    setClientName('')
    setEmailId('')
    setOffer('')
    setServiceId('')
  };

  const hideModal = () => {
    setVisible(false)
  };

  const giftcardUI = () => {
    const columns = [
      {
        title: 'Gift Card No',
        dataIndex: 'giftCardId',
        key: 'giftCardId',
      },
      {
        title: 'Client Name',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Email Id',
        dataIndex: 'clientEmailId',
        key: 'clientEmailId',

      },
      {
        title: 'Service',
        dataIndex: 'serviceName',
        key: 'serviceName',

      },
      {
        title: 'Offer',
        dataIndex: 'offer',
        key: 'offer',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status =>
          (<Tag color={'green'} key={status}>{status}</Tag>)
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        id: 1,
        address: 'New York No. 1 Lake Park',
        tags: ['New'],
        email: 'akash@gmail.com',
        offer: '10% off',
        service: 'service 1'
      },
    ];
    if (isLoading) {
      return (
        <div className={'gift-card'}>
          <Skeleton paragraph={{ rows: 10 }} />
        </div>
      )
    }
    else if (isError) {
    } else {
      return (
        <div className={'gift-card'}>
          <Table
            dataSource={giftCardSearchResult.length ? giftCardSearchResult : giftCards}
            columns={columns} />
        </div>
      )
    }
  }

  const searchTextChanged = (searchText) => {
    const giftCardSearchResult = giftCards.filter(giftcard => giftcard.giftCardId.toLowerCase().includes(searchText.toLowerCase()))
    setSearchText(searchText)
    setGiftCardSearchResult(giftCardSearchResult)
  }

  return (
    <div className="gift-card-screen">
      <div className={'content-wrapper'}>
        <PageTitle
          title={'Gift Cards'}
        />
        <div className={"gift-card"}>
          <Card>
            <div className={'gift-card-wrapper'}>
              <div className={'gift-card-inner-wrapper'}>
                <div className={'options-wrapper'}>
                  <div className={'search-wrapper'}>
                    <Input placeholder="Search..."
                      prefix={<SearchOutlined />}
                      value={searchText}
                      onChange={e => searchTextChanged(e.target.value)} />
                  </div>
                  <div className={'primary-btn '} onClick={() => showModal(giftcard)}>
                    Create New
                  </div>
                </div>
                {giftcardUI()}
                <Modal
                  visible={visible}
                  onCancel={hideModal} footer={null} width={700} style={{ top: 250 }} >
                  <div className="modal-title" style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: ' bolder', fontSize: '18px', marginTop: -10
                  }}>Gift Cards-Create</div>

                  <div className="create-wrapper" style={{ display: 'flex', marginTop: 20 }}>
                    <Input
                      placeholder="Client Name"
                      defaultValue={clientName}
                      onChange={e => setClientName(e.target.value,setShowError(false))}
                      style={{
                        width: '70%',
                        backgroundColor: ' #E2E2E2',
                        blockSize: 40, border: '0px',
                        borderRadius: '5px',
                        marginRight: 10
                      }}
                    />
                    <Input
                      placeholder="Email Id"
                      defaultValue={emailId}
                      onChange={e => setEmailId(e.target.value,setShowError(false))}
                      style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px' }} />
                  </div>
                  <div className={'create-row'} style={{ display: 'flex', marginTop: 20 }}>
                    <Input
                      placeholder="Service Name"
                      defaultValue={serviceId}
                      onChange={e => setServiceId(e.target.value,setShowError(false))}
                      style={{ width: '70%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }} />
                    <Input
                      placeholder="Value"
                      defaultValue={offer}
                      onChange={e => setOffer(e.target.value,setShowError(false))}
                      style={{ width: '37%', backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginRight: 10 }}
                    />
                    <div className={" select-wrapper"}  >
                      <input type="text" list="option" style={{ width: 140, backgroundColor: ' #E2E2E2', blockSize: 40, border: '0px', borderRadius: '5px', marginBottom: 30 }} />
                      <datalist id="option" >
                        <option>$</option>
                        <option>%</option>
                      </datalist>
                    </div>
                  </div>
                  <Button loading={saveGiftcardLoading}
                    onClick={() => saveGiftcard(giftcard)} className="save-btn" style={{ float: 'right', backgroundColor: '#5D72E9', color: 'white', borderRadius: '5px', padding: '0px 25px 0px 25px', marginTop: '-20px' }}>Save</Button>
                {showError && <div style={{
          color: 'red',
          textAlign: 'center',
          margin: '5px 0px -15px 0'
        }}>All the fields are mandatory</div>}
                </Modal>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default GiftCards