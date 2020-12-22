import React from 'react';
import './header.scss';
//import Divider from '@material-ui/core/Divider';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import { withStyles, makeStyles } from '@material-ui/core/styles';
//import { HEADER_TITLE } from './constants/';
//import { capitalize } from '../../utils/';
//import { withRouter, } from "react-router-dom";
import Cookies from 'js-cookie';
//import Button from '@material-ui/core/Button';
import { UserOutlined } from '@ant-design/icons';
import { Anchor,Image } from 'antd';

const { Link } = Anchor;
class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      userType: '',
    }
  }

  componentDidMount() {
    const userType = Cookies.get('userType')
    if (userType) {
      this.setState({ userType })
    }
  }

  logOutClicked = () => {
    Cookies.remove('accessToken')
    Cookies.remove('userType')
    window.location.reload();
  }

  render() {

    return (
      <div className={'header'}>
        <div className={'header-wrapper'}>
          {/* <img src={brandLogo} style={{height:'28px',position:'absolute'}}/> */}
          <span className={'header-title'}>Glow Tox</span>
          <div className={'profile-name'}>
            <div className={'profile-inner-wrapper'}>
              <div className={'profile-icon'}>
                {/* <AccountCircleIcon /> */}
                <Image
      width={25}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    /> 
              </div>
              <div className={'profile-text'}> <Anchor affix={false}><Link href="/Profile" title="Akash Hamse" /></Anchor></div>
            </div>
          </div>
        </div>
        {/* <Divider /> */}
      </div>
    );
  }
}
export default Header