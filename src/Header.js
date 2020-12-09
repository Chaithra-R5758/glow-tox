import React from 'react';
import './header.scss';
//import Divider from '@material-ui/core/Divider';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import { withStyles, makeStyles } from '@material-ui/core/styles';
import { HEADER_TITLE } from './constants/';
//import { capitalize } from '../../utils/';
//import { withRouter, } from "react-router-dom";
import Cookies from 'js-cookie';
//import Button from '@material-ui/core/Button';

class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      userType: '',
    }
  }

  componentDidMount(){
    const userType = Cookies.get('userType')
    if(userType){
      this.setState({userType})
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
          <span className={'header-title'}>{HEADER_TITLE}</span>
          <div className={'profile-name'}>
            <div className={'profile-inner-wrapper'}>
              <div className={'profile-icon'}>
                  {/* <AccountCircleIcon /> */}
                  </div>
              <div className={'profile-text'}> Hi, </div>
              <div className={'user-alphabet'}>asdf</div>
            </div>
          </div>
        </div>
        {/* <Divider /> */}
      </div>
    );
  }
}
export default Header