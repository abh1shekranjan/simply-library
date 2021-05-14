const serverUrl = "http://localhost:4000";

export const SERVER_ROUTES = {
    SIGNUP: '/register-user',
    LOGIN: '/login-user'
}

export const httpPostMethod = (path, headers, body) => {
    let statusCode = 0;
    const apiUrl = serverUrl + path;
    const config = {
        method: 'post',
        headers: headers,
        body: JSON.stringify(body)
    }
    return fetch(apiUrl, config)
        .then((res) => {
            statusCode = res.status;
            if (statusCode === 200) {
                return res.json()
            }
            else {
                return res.text()
            }
        })
        .then((res) => {
            if (statusCode === 200) {
                return res
            }
            else {
                throw new Error(res)
            }
        })
}