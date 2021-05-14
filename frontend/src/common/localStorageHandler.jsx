export const LOCAL_STORAGE_KEY = {
    XAPIKEY: 'x-api-key',
    JWT: 'jwt'
}

export const getLocalStorageItem = (key) => {
    return localStorage.getItem(key);
}

export const saveItemToLocalStorage = (key, value) => {
    return localStorage.setItem(key, value);
}

export const removeAllFromLocalStorage = () => {
    localStorage.clear();
}