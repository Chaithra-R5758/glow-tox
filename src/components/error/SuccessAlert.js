import React, {Component} from 'react';
import { Alert } from 'antd';
export default class SuccessAlert extends Component {
    
    render() {
        return(
            <div className="alert alert-success" >
                <Alert style={{width:500}} message="Data Created Successfully!" type="success" closable showIcon />
             
            </div>
        );
            
        
    }
}