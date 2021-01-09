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
  MenuOutlined
} from '@ant-design/icons';
import { getRouteName } from '../../utils/';
//import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Drawer, Button, Radio, Space } from 'antd';


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
      selectedNavOption: -1,
      visible: false,
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

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
    this.setState({ selectedNavOption: index, visible: false })
  }

  getIcon = (navOption, index, selectedNavOption, navIconSize) => {
    //const iconSize = '18px';
    const grey3 = '#b1b1b1';
    const white = '#fff';
    switch (navOption) {
      case 'Dashboard': return <AppstoreFilled style={{
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Services': return <ExperimentFilled style={{
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Promotions': return <FundFilled style={{
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Service History': return <HistoryOutlined style={{
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      case 'Gift Cards': return <GiftFilled style={{
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      default: return
    }
  }

  getNavOptionsMob = () => {
    const grey3 = '#edf0f5';
    const navIconSize = '24px'
    const { selectedNavOption } = this.state
    const result = NAV_OPTIONS.map((navOption, index) => {
      return (
        <div className={'nav-option'} style={{ display: 'flex', margin: '20px 0' }} onClick={() => this.navItemClicked(navOption, index)}>
          {this.getIcon(navOption, index, selectedNavOption, navIconSize)}
          <div style={{ color: '#fff', margin: '0 10px' }} className={'nav-option-title-selected'}> {navOption} </div>
          {/* {selectedNavOption === index &&
              <span className={'caret-icon'}><CaretLeftOutlined style={{ color: grey3 }} /></span>
            }           */}
        </div>
      )
    })
    return result
  }

  getNavOptions = () => {
    const grey3 = '#edf0f5';
    const navIconSize = '18px'
    const { selectedNavOption } = this.state
    const result = NAV_OPTIONS.map((navOption, index) => {
      return (
        <div className={'nav-option'} onClick={() => this.navItemClicked(navOption, index)}>
          <div>
            {this.getIcon(navOption, index, selectedNavOption, navIconSize)}
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
    const { visible, selectedOption, userType, selectedNavOption } = this.state



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
          <div className={'nav-options-wrapper'} >
            {this.getNavOptions()}

            <div className={'nav-option logout-option'} onClick={() => null}>
              <div>
                <AppstoreFilled style={{
                  fontSize: '24px',
                  color: '#b1b1b1'
                }} />
              </div>
              <div className={0 ? 'nav-option-title-selected' : 'nav-option-title'}>Logout</div>
            </div>
          </div>
          {/* {userType && this.getNavOptions().map((text, index) => (
            
            <div
              className={text === selectedOption ? 'nav-options option-selected' : 'nav-options'}
              onClick={() => this.navItemClicked(text)}>
              {this.getIcon(text)}
            </div>
            
          ))} */}
        </div >
        <div className={'nav-bar-mob-wrapper'}>
          <MenuOutlined onClick={this.showDrawer} />
        </div>
        <Drawer
          title="Basic Drawer"
          placement={'left'}
          closable={false}
          onClose={() => this.setState({ visible: false })}
          visible={visible}
          title={<div style={{ color: '#fff' }}>Glow Tox</div>}
          headerStyle={{ backgroundColor: '#343557', color: '#fff' }}
          bodyStyle={{ backgroundColor: '#343557' }}
          key={'left'}>
          <div className={'nav-options-wrapper-mob'} >
            {this.getNavOptionsMob()}
          </div>
        </Drawer>
      </div >
    )
  }
}
export default withRouter(NavBar)
