import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: "https://glowtox/",//process.env.REACT_APP_ANALYTICS_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('accessToken') || '',
    }
});

export default api;
