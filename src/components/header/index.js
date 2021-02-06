import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './header.scss';
import axios from '../../config/api/'

const Header = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    async function getUserDetails() {
      try {
        const { data } = await axios.get('admin')
        const userDetails = (data && data.user) || ''
        if (userDetails)
          setUserDetails(userDetails)
      } catch (e) {
        //this.setState({ isError: true })
      }
    }
    getUserDetails()
  }, []);

  return (
    <div className={'header'}>
      <div className={'header-wrapper'}>
        <span className={'header-title'}>Glow Tox</span>
        <div className={'profile-name'}>
          <div className={'profile-inner-wrapper'} onClick={() => history.push({ pathname: "/profile" })}>
            <div className={'profile-icon'}>
              {
                <img
                  className={'profile-icon-img'}
                  src={userDetails.profilePic || ''} />
              }
            </div>
            <div className={'profile-text'}> {userDetails.userName || ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header