import React from 'react';
import { withRouter, } from "react-router-dom";
// import Drawer from '@material-ui/core/Drawer';
// import DehazeIcon from '@material-ui/icons/Dehaze';
// import MailIcon from '@material-ui/icons/Mail';
// import PersonIcon from '@material-ui/icons/Person';
// import GroupIcon from '@material-ui/icons/Group';
//import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import './navbar.scss';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import LocalActivityIcon from '@material-ui/icons/LocalActivity';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// import AccessibilityIcon from '@material-ui/icons/Accessibility';
// import PaymentIcon from '@material-ui/icons/Payment';
// import ReceiptIcon from '@material-ui/icons/Receipt';

import { NAV_OPTIONS, HEADER_TITLE } from '../../constants/';
//import Tooltip from '@material-ui/core/Tooltip';
import { getRouteName } from '../../utils/';
//import { connect } from 'react-redux';
import Cookies from 'js-cookie';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      selectedOption: '',
      userType: '',
      //  screenName: 'Home',
    }
  }

  getIcon = (text) => {
    return "a"
    // switch (text) {
    //   case 'Partners': return (<GroupIcon />)
    //   case 'Users': return (<PersonIcon />)
    //   case 'Tickets': return (<ChromeReaderModeIcon />)

    //   case 'Profile': return (<AssignmentIndIcon />)
    //   case 'Overview': return (<PageviewIcon />)
    //   case 'Gateway Activity': return (<LocalActivityIcon />)
    //   case 'Notification': return (<NotificationsActiveIcon />)
    //   case 'Employee': return (<AccessibilityIcon />)

    //   case 'Make a Payment': return (<PaymentIcon />)
    //   case 'Payment History': return (<ReceiptIcon />)

    //   default: return (<MailIcon />)
    // }
  }

  componentWillMount(){
    const userType = Cookies.get('userType')
    if(userType){
      this.setState({userType})
    }
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ left: open });
  };

  navItemClicked = (screenName) => {
    this.props.history.push(getRouteName(screenName))
    this.setState({ selectedOption: screenName })
  }

  getNavOptions = () => {
    const { userType } = this.state
    if (userType === 'admin') return NAV_OPTIONS.admin
    if (userType === 'partner') return NAV_OPTIONS.partner
    if (userType === 'payee') return NAV_OPTIONS.payee
  }

  sideList = (side, options) => (
    <div
      className={''}
      style={{}}
      role="presentation"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}>
      <div className={'nav-title'}>{HEADER_TITLE}</div>
      <div className={'nav-option-outer-wrapper'}>
        {options.map((text, index) => (
          <div
            className={'nav-option-wrapper'}
            key={text}
            onClick={() => this.navItemClicked(text)}>
            <span className={text === this.state.selectedOption ? 'nav-option-icon option-selected' : 'nav-option-icon'}>{this.getIcon(text)}</span>
            <span className={text === this.state.selectedOption ? 'option-selected nav-option-title' : 'nav-option-title'}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );



  render() {
    //const { loginReducers } = this.props
    const { selectedOption, userType} = this.state

    // if (window.location.pathname === '/login' || window.location.pathname === '/')
    //   return null

    return (
      <div className={'nav'}>
        <div className={'navbar'} >
          <div className={'nav-title'}
            onClick={this.toggleDrawer('left', true)}>
            {/* <DehazeIcon /> */}
          </div>
          <div className={'nav-options-wrapper'}>
            {userType && this.getNavOptions().map((text, index) => (
              // <Tooltip title={text} placement="right">
                <div
                  className={text === selectedOption ? 'nav-options option-selected' : 'nav-options'}
                  onClick={() => this.navItemClicked(text)}>
                  {this.getIcon(text)}
                </div>
              // </Tooltip>
            ))}
          </div>
          {/* <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            {userType && this.sideList('left', this.getNavOptions())}
          </Drawer> */}
        </div>
      </div>
    )
  }


}



const mapStateToProps = ({  }) => {
  return {  }
};

export default NavBar