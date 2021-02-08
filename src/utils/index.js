import Cookies from 'js-cookie';

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getRouteName = (name) => {
    if (typeof name !== 'string') return ''
    return name.toLowerCase().replace(/\s/g, '')
}

export const validateEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return reg.test(email)
}

export const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

export const URItobase64 = async (d) => {
    var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
    reader.readAsDataURL(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
    return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
      reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
        res(e.target.result)
      }
    })
  } 
  
  export const urltoBase64 = async (url) => {
    var res = await fetch(url);
    var blob = await res.blob();
    var uri = await URItobase64(blob);
    return uri;
  }
  
export const refeshUI = () => {
    window.location.reload()
}

export const getUserId = () => {
    return Cookies.get('userId')
}

export const getExtensionFromUrl = ( url ) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

export const isBase64 = (str) => {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}