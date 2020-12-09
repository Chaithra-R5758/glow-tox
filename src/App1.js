import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  LaptopOutlined, NotificationOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: true,
  };

  render() {
    return (
      <Layout>
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> */}
          {/* </Menu> */}
      asdf asdf
    </Header>

        <Layout>
          <Sider width={80} className="site-layout-background" style={{ position: 'fixed', height: '100%'}}>
             <div style={{marginTop:'60px'}}>
               <div>op1</div>
               <div>op2</div>
               <div>op3</div>
               <div>op4</div>
               <div>op5</div>
               <div>op6</div>
             </div>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
           
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                marginTop: '80px',
                minHeight: 280,
                marginLeft: '72px',
              }}
            >
              <div>111</div>
              <div>222</div>
              <div>333</div>
              <div>444</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div><div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div><div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>
              <div>123</div>

            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;

