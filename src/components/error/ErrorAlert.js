import React, {Component} from 'react';
import { Alert } from 'antd';
export default class ErrorAlert extends Component {
    
    render() {
        return(
            <div className="alert alert-success" role="alert">
             <Alert style={{width:500}} message="Error Occured!" type="error" closable showIcon />
            </div>
        );
       
           
        
    }
}