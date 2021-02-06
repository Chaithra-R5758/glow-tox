import { PageHeader } from 'antd';
import './error.scss'

const Error = (props) => {
    return (
        <div
            className={'error-component-wrapper'}>
            <PageHeader
                className="site-page-header"
                {...props}
                //title="Something went wrong"
            />
        </div>
    )
}
export default Error