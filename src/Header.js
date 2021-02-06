import React from 'react';
import { withRouter, } from "react-router-dom";
import './header.scss';
import Cookies from 'js-cookie';
import { Anchor, Image } from 'antd';
const { Link } = Anchor;

class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      userType: '',
    }
  }

  componentDidMount() {
    const { userDetails } = this.state
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
          <span className={'header-title'}>Glow Tox</span>
          <div className={'profile-name'}>
            <div className={'profile-inner-wrapper'} onClick={() => this.props.history.push('/profile')}>
              <div className={'profile-icon'}>
                {
                  <img
                  className={'profile-icon-img'}
                  src={'https://pbs.twimg.com/profile_images/1227540838596562944/bs5ZQkrs.jpg'} />
                }
              </div>
              <div className={'profile-text'}> {'Suneet Patil'}</div>
            </div>
          </div>
        </div>
        {/* <Divider /> */}
      </div>
    );
  }
}
export default withRouter(Header)