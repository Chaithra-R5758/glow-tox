import './App.css';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <div className={'header-title'}>
            HEADER
        </div>
        </Header>
        <Layout>
          <Sider>
            <div className={'nav-option'}>1</div>
            <div className={'nav-option'}>1</div>
            <div className={'nav-option'}>1</div>
            <div className={'nav-option'}>1</div>
            <div className={'nav-option'}>1</div>
          </Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
