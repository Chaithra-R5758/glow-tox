import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: "https://d9c6y9z297.execute-api.eu-west-1.amazonaws.com/prod",//"https://glowtox/",//process.env.REACT_APP_ANALYTICS_URL,
    headers: {
        'Content-Type': 'application/json',
    //    'Authorization': Cookies.get('accessToken') || '',
    }
});

export default api;
