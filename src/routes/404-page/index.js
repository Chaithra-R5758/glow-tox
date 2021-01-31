import { Card } from 'antd'
import React from 'react'
import { Button } from 'antd'
//import pagenotfoundImg from "../../assets/pagenotfound.jpg";
import './404-page.scss'
const PageNotFound = () => {
    return (

        <div className="wrapper" style={{ left: '40%',position: 'absolute',
        top: '40%',justifyContent:'center'}}>
           
       <div className={'title'}>  404 <br/>Page Not Found </div>
   <div className={'error-btn'}> <Button style={{backgroundColor: '#5b71e8',color:'white'}}><a href="/login">Login</a></Button></div>
        </div >
    )
}

export default PageNotFound