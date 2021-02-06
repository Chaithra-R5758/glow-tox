import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from "react-router-dom";
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
  MenuOutlined,
  HomeFilled,
  StarFilled,
  ShopFilled,
  FileTextFilled,
  DribbbleCircleFilled,
  PoweroffOutlined
} from '@ant-design/icons';
import { getRouteName } from '../../utils/';
//import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Drawer, Button, Radio, Space } from 'antd';
import home from '../../assets/home.jpg'

const NavBar = () => {

  const [selectedOption, setSelectedOption] = useState('')
  const [userType, setUserType] = useState('')
  const [selectedNavOption, setSelectedNavOption] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [pathname, setPathname] = useState('')

  const history = useHistory();

  const showDrawer = () => {
    setVisible(true)
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const path = window.location.pathname
    if (selectedNavOption === -1) {
      setSelectedNavOption(getIndexForPath(path))
    }
  });

  //useEffect
  // componentWillMount() {
  //   const path = window.location.pathname
  //   const { selectedNavOption } = state
  //   if (selectedNavOption === -1) {
  //     setState({
  //       selectedNavOption: getIndexForPath(path)
  //     })
  //   }
  // }

  //useEffect
  // componentWillUpdate(newProps, newState) {
  //   const path = window.location.pathname
  //   const { pathname } = state
  //   if (!pathname || pathname !== path) {
  //     setState({ pathname: path }, () => {
  //       setState({ selectedNavOption: getIndexForPath(path) })
  //     })
  //   }
  // }

  const getIndexForPath = (path) => {
    switch (path) {
      case '/dashboard': return 0;
      case '/services': return 1;
      case '/promotions': return 2;
      case '/servicehistory': return 3;
      case '/giftcards': return 4;
      default: return 0;
    }
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  };

  const navItemClicked = (screenName, index) => {
    history.push({ pathname: getRouteName(screenName) });
    setSelectedNavOption(index)
    setVisible(false)
  }

  const getIcon = (navOption, index, selectedNavOption, navIconSize) => {
    const grey3 = '#ccd4f8';
    const white = '#fff';
    switch (navOption) {
      case 'Dashboard': return <HomeFilled style={{
        cursor: 'pointer',
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }}
      />

      case 'Services': return <DribbbleCircleFilled style={{
        cursor: 'pointer',
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />

      case 'Promotions': return <FundFilled style={{
        cursor: 'pointer',
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />

      case 'Service History': return <FileTextFilled style={{
        cursor: 'pointer',
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />

      case 'Gift Cards': return <GiftFilled style={{
        cursor: 'pointer',
        fontSize: navIconSize,
        color: selectedNavOption === index ? white : grey3
      }} />
      default: return
    }
  }

  const logOutClicked = () => {
    Cookies.remove('accessToken')
    Cookies.remove('recId')
    Cookies.remove('userId')
    Cookies.remove('userType')
    window.location.reload();
  }

  const getNavOptionsMob = () => {
    const grey3 = '#edf0f5';
    const navIconSize = '24px'
    const result = NAV_OPTIONS.map((navOption, index) => {
      return (
        <div className={'nav-option'} style={{ display: 'flex', margin: '20px 0' }} onClick={() => navItemClicked(navOption, index)}>
          {getIcon(navOption, index, selectedNavOption, navIconSize)}
          <div style={{ color: '#fff', margin: '0 10px' }} className={'nav-option-title-selected'}> {navOption} </div>
          {/* {selectedNavOption === index &&
              <span className={'caret-icon'}><CaretLeftOutlined style={{ color: grey3 }} /></span>
            }           */}
          <div className={'nav-option logout-option-mob'}
            style={{
              display: 'flex',
              bottom: 20,
              position: 'absolute',
              width: '100%'
            }}
            onClick={logOutClicked}>
            <div>
              <PoweroffOutlined style={{
                cursor: 'pointer',
                fontSize: '20px',
                color: '#b1b1b1',
              }} />
            </div>
            <div className={0 ? 'nav-option-title-selected' : 'nav-option-title'} style={{ color: '#fff', margin: '0 10px' }}>Logout</div>
          </div>
        </div>
      )
    })
    return result
  }

  const getNavOptions = () => {
    const grey3 = '#edf0f5';
    const navIconSize = '18px'
    //const { selectedNavOption } = state
    const result = NAV_OPTIONS.map((navOption, index) => {
      return (
        <div className={'nav-option'} onClick={() => navItemClicked(navOption, index)}>
          <div>
            {getIcon(navOption, index, selectedNavOption, navIconSize)}
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

  const sideList = (side, options) => (
    <div
      className={''}
      style={{}}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}>
      <div className={'nav-title'}>{HEADER_TITLE}</div>
      <div className={'nav-option-outer-wrapper'}>
        {options.map((text, index) => (
          <div
            className={'nav-option-wrapper'}
            key={text}
            onClick={() => navItemClicked(text)}>
            <span className={text === selectedOption ? 'nav-option-icon option-selected' : 'nav-option-icon'}>{getIcon(text)}</span>
            <span className={text === selectedOption ? 'option-selected nav-option-title' : 'nav-option-title'}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const iconSize = '18px';
  const grey3 = '#b1b1b1';
  return (
    <div className={'nav-screen'}>
      <div className={'navbar'} >
        {/* <div className={'nav-title'}
            onClick={toggleDrawer('left', true)}>
             <DehazeIcon /> 
          </div> */}
        <div className={'nav-options-wrapper'} >
          {getNavOptions()}

          <div className={'nav-option logout-option'} onClick={logOutClicked}>
            <div>
              <PoweroffOutlined style={{
                cursor: 'pointer',
                fontSize: '16px',
                color: '#b1b1b1'
              }} />
            </div>
            <div className={0 ? 'nav-option-title-selected' : 'nav-option-title'}>Logout</div>
          </div>
        </div>
        {/* {userType && getNavOptions().map((text, index) => (
            <div
              className={text === selectedOption ? 'nav-options option-selected' : 'nav-options'}
              onClick={() => navItemClicked(text)}>
              {getIcon(text)}
            </div>
          ))} */}
      </div >
      <div className={'nav-bar-mob-wrapper'}>
        <MenuOutlined onClick={showDrawer} />
      </div>
      <Drawer
        title="Basic Drawer"
        placement={'left'}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        title={<div style={{ color: '#fff' }}>Glow Tox</div>}
        headerStyle={{ backgroundColor: '#5C72E9', color: '#fff' }}
        bodyStyle={{ backgroundColor: '#5C72E9' }}
        key={'left'}>
        <div className={'nav-options-wrapper-mob'} >
          {getNavOptionsMob()}
        </div>
      </Drawer>
    </div >
  )
}
export default NavBar
