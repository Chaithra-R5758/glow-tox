import Cookies from 'js-cookie';

export const refeshUI = () => {
    window.location.reload()
}

export const getUserId = () => {
    return Cookies.get('userId')
}

export const getRecId = () => {
    return Cookies.get('recId')
}
