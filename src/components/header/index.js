import React from 'react';
import { useHistory } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const history = useHistory();
    return (
      <div className={'header'}>
        <div className={'header-wrapper'}>
          <span className={'header-title'}>Glow Tox</span>
          <div className={'profile-name'}>
            <div className={'profile-inner-wrapper'} onClick={() => history.push({ pathname:  "/profile" })}>
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
export default Header