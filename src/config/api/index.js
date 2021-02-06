import axios from 'axios';
import Cookies from 'js-cookie';
const auth = Cookies.get('accessToken')

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': auth ? `Bearer ${auth}`:'',
    }
});

export default api;
