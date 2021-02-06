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

export const refeshUI = () => {
    window.location.reload()
}

export const getUserId = () => {
    return Cookies.get('userId')
}