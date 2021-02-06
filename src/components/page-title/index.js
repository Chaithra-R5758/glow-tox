import './pageTitle.scss';
import { Divider } from 'antd';

export const PageTitle = (props) => {
    return (
        <div className={'page-title-wrapper'}>
            <div className={'page-title'}>{props.title}</div>
            <Divider className={'page-title-divider'} />
        </div>
    )
}