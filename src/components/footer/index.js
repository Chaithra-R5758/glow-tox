import React from 'react';
import './footer.scss';
import { COPYRIGHT_DESC } from "../../constants/";
import { withRouter, } from "react-router-dom";

const Footer = () => {
    return (
      <div className={'footer'}>
        <div className={'footer-wrapper'}>
          <div className={'footer-title'}>{COPYRIGHT_DESC}</div>
        </div>
      </div>
    );
}
export default Footer