export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getRouteName = (name) => {
    if (typeof name !== 'string') return ''
    return name.toLowerCase().replace(/\s/g,'')
}

export const validateEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return reg.test(email)
}