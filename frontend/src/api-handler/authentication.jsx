import { AUTHENTICATION_HEADER } from "./header"
import { httpPostMethod, SERVER_ROUTES } from "./httphandler"

// used to login
export const loginApi = (body) => {
    return httpPostMethod(SERVER_ROUTES.LOGIN, AUTHENTICATION_HEADER, body)
}

// used to sign up
export const signinApi = (body) => {
    return httpPostMethod(SERVER_ROUTES.SIGNUP, AUTHENTICATION_HEADER, body)
}
