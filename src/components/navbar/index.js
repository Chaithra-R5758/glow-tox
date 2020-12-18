import React from 'react';
import { withRouter, } from "react-router-dom";
import Icon from '@ant-design/icons';
import './navbar.scss';
import { NAV_OPTIONS, HEADER_TITLE } from '../../constants/';
import {
  CaretLeftOutlined,
  GiftFilled,
  FundFilled,
  ExperimentFilled,
  AppstoreFilled,
  HistoryOutlined,
} from '@ant-design/icons';
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
      selectedNavOption: 0,
    }
  }

  getIcon = (text) => {
    return "a"
  }

  componentWillMount() {
    const userType = Cookies.get('userType')
    if (userType) {
      this.setState({ userType })
    }
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ left: open });
  };

  navItemClicked = (screenName, index) => {
    this.props.history.push(getRouteName(screenName))
    this.setState({ selectedNavOption: index })

    // this.setState({selectedNavOption:index})
  }

  getIcon = (navOption, index, selectedNavOption) => {
    const iconSize = '18px';
    const grey3 = '#b1b1b1';
    const white = '#fff';
    switch (navOption) {
      case 'Dashboard': return <AppstoreFilled style={{
        fontSize: iconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Services': return <ExperimentFilled style={{
        fontSize: iconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Promotions': return <FundFilled style={{
        fontSize: iconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Service History': return <HistoryOutlined style={{
        fontSize: iconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Gift Cards': return <GiftFilled style={{
        fontSize: iconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      default: return
    }
  }

  getNavOptions = () => {
    const grey3 = '#edf0f5';
    const { selectedNavOption } = this.state
    const result = NAV_OPTIONS.map((navOption, index) => {
      return (
        <div className={'nav-option'} onClick={() => this.navItemClicked(navOption, index)}>
          <div>
            {this.getIcon(navOption, index, selectedNavOption)}
            {selectedNavOption === index &&
              <span className={'caret-icon'}><CaretLeftOutlined style={{ color: grey3 }} /></span>
            }
          </div>
          <div className={selectedNavOption === index ? 'nav-option-title-selected' : 'nav-option-title'}> {navOption} </div>
        </div>
      )
    })
    return result
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
    const { selectedOption, userType, selectedNavOption } = this.state

    // if (window.location.pathname === '/login' || window.location.pathname === '/')
    //   return null
    const iconSize = '18px';
    const grey3 = '#b1b1b1';
    return (
      <div className={'nav-screen'}>
        <div className={'navbar'} >
          {/* <div className={'nav-title'}
            onClick={this.toggleDrawer('left', true)}>
             <DehazeIcon /> 
          </div> */}
          <div className={'nav-options-wrapper'}>
            {this.getNavOptions()}
          </div>
          {/* {userType && this.getNavOptions().map((text, index) => (
            
            <div
              className={text === selectedOption ? 'nav-options option-selected' : 'nav-options'}
              onClick={() => this.navItemClicked(text)}>
              {this.getIcon(text)}
            </div>
            
          ))} */}
        </div>
        {/* <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            {userType && this.sideList('left', this.getNavOptions())}
          </Drawer> */}
      </div>
    )
  }


}



export default withRouter(NavBar)