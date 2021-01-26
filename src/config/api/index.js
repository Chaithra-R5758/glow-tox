import axios from 'axios';
import Cookies from 'js-cookie';
const auth = Cookies.get('accessToken')

const api = axios.create({
    baseURL: "https://d9c6y9z297.execute-api.eu-west-1.amazonaws.com/dev",//"https://glowtox/",//process.env.REACT_APP_ANALYTICS_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': auth ? `Basic ${auth}`:'',
    }
});

export default api;
