import React from 'react';
import { PageTitle } from '../../components/page-title'
import './service.scss';
import brandLogo from '../../assets/test-img.jpg'
import { Card, Input, Form, Upload, Button } from 'antd';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';

import ImgCrop from 'antd-img-crop';
const { Meta } = Card;
const { TextArea } = Input;



class ServiceAdd extends React.Component {
  state = {
    modal1Visible: false,
    modal2Visible: false,
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ]
  };


  onChange = ({ fileList: newFileList }) => {
    this.setState({ fileList: newFileList })
  };

  render() {
    const { fileList } = this.state
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    return (
      <div className="service-screen">
        <div className={'content-wrapper'}>
          <PageTitle
            title={'Service - Add / Edit'}
          />
          <div className={'content-body-wrapper'}>
            <div className={'add-btn'}>
              Save
            </div>

            <div className={'dashboard-card-wrapper'}>
              <div className={'service-add-outer-wrapper-card'}>
                <Card style={{}}>
                  <div className={'service-add-content'}>
                    <div className={'service-add-left-content'}>
                      <img
                        alt="example"
                        className={'service-add-img'}
                        src={brandLogo} />
                      <div className={'service-card-body-wrapper'}>
                        <div className={'image-picker-outer-wrapper'}>
                        {fileList.length === 0 && <div className={'image-picker-title'}>Before</div> }
                          <div className={'image-picker-wrapper'}>
                            <Upload
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              listType="picture"
                              fileList={fileList}
                              onChange={(files) => this.onChange(files)}
                              //defaultFileList={[...fileList]}
                              className="upload-list-inline">
                               {fileList.length === 0 && <Button icon={<UploadOutlined />}>Upload</Button> }
                            </Upload>
                          </div>
                          {fileList.length === 1 && <div className={'image-picker-title'}>Before</div>}
                        </div>

                        <div className={'image-picker-outer-wrapper'}>
                        {fileList.length === 0 && <div className={'image-picker-title'}>After</div> }
                          <div className={'image-picker-wrapper'}>
                          <Upload
                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                              listType="picture"
                              fileList={fileList}
                              onChange={(files) => this.onChange(files)}
                              className="upload-list-inline">
                               {fileList.length === 0 && <Button icon={<UploadOutlined />}>Upload</Button> }
                            </Upload>
                            {/* <ImgCrop rotate>
                              <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={(files) => this.onChange(files)}
                                onPreview={onPreview}
                              >
                                {fileList.length < 1 && '+ Upload'}
                              </Upload>
                            </ImgCrop> */}
                          </div>
                          {fileList.length === 1 && <div className={'image-picker-title'}>After</div> }
                        </div>
                      </div>
                      <div className={'plus-btn-wrapper'}>

                      
                      <div className={'plus-btn'}>
                        <PlusCircleOutlined 
                        style={{ 
                          fontSize: '20px',
                          color: 'rgb(38 38 38)',
                          padding: '0 10px',
                        }}
                        />
                        Add
                      </div>
                      </div>
                      {/* <Button type="primary">Add</Button> */}
                    </div>
                    <div className={'service-add-right-content'}>

                      <Form
                         {...layout} 
                        name="nest-messages"
                      //validateMessages={validateMessages}
                      >
                        <Form.Item name={['user', 'name']} label="Client Name"
                        // rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Email Id"
                          rules={[{ type: 'email' }]}>
                          <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Description"
                          rules={[{ type: 'email' }]}>
                          <TextArea rows={4} />
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
}

export default ServiceAdd;
