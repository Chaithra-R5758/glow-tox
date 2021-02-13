import {  Tag, } from 'antd';


export const StatusComponent = (props) => {
    switch(props.status){
        case 'New': return(<Tag color={'yellow'} key={props.status}>{props.status}</Tag>); 
        break;
        case 'Rejected': return(<Tag color={'red'} key={props.status}>{props.status}</Tag>);
        break;
        case 'Redeemed': return(<Tag color={'green'} key={props.status}>{props.status}</Tag>);
        break;
        default: return
        break;
    }
}