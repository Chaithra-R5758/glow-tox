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
export const getPromoName= () => {
    return Cookies.get('promoName')
}
export const getDescription= () => {
    return Cookies.get('description')

}
export const getPromoPic= () => {
    return Cookies.get('promoPic')
}
export const  getService= () => {
    return Cookies.get('serviceId')
}
export const getIsActive= () => {
    return Cookies.get('isActive')
}
export const  getOffer= () => {
    return Cookies.get('offer')
}
export const  getPromoCode= ()=> {
    return Cookies.get('promoCode')
}
export const  getClientName= ()=> {
    return Cookies.get('clientName')
}
export const  getStatus= ()=> {
    return Cookies.get('status')
}
export const  getEmailId= ()=> {
    return Cookies.get('emailId')
}
export const  getServiceId= ()=> {
    return Cookies.get('service')
}
