import { Spin } from 'antd';
import { Component } from 'react';
import './loading.scss'

const LoadingScreen = () => {
  return (
    <div className="loading">
      <div className="example">
        <Spin tip="Loading..." size='large' />
      </div>
    </div>
  )
}
export default LoadingScreen;