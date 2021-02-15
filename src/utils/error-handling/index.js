import { message } from 'antd';
import { logOutUser } from '../index'

const showError = ({ toast, data }) => {
    const errorMsg = "Something went wrong"
    switch (toast) {
        case 'error':
            message.error(data.message || errorMsg)
            break;
        default:
            message.error(data)
    }
};

export const handleError = ({ code = 0, message = '', response = '' }) => {
    const { data } = response
    switch (code) {
        case 100:
            showError({ toast: 'error', data: `Unable to connect. Please try again.` });
            break;
        case 209:
            logOutUser();
            showError({ toast: 'error', data: `Your session has expired.` });
            break;
        default:
            showError({ toast: 'error', data });
    }
};
