import { Zoom } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { loginApi } from '../../api-handler/authentication';
import { isValidEmailWeb } from '../../common/emailHandler';
import { LOCAL_STORAGE_KEY, saveItemToLocalStorage } from '../../common/localStorageHandler';
import { loginImage } from '../../imageUrl';
import PasswordTextField from '../common/password-field';
import { SuccessSnackBar } from '../common/snackbar';

export default function SignIn(props) {

    const { openSignUp } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmiting, setSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const doLogin = () => {
        // creating the request body
        const body = {
            email: email.trim(),
            password: password.trim()
        }
        // init messeges
        setErrorMessage('');
        setSubmit(true)

        Promise.resolve()
            .then(() => loginApi(body)) // request to login
            .then((res) => {
                // get the response if statusCode is 200
                const { message, jwt } = res;
                setSuccessMessage(message);
                // save localstorage data
                saveItemToLocalStorage(LOCAL_STORAGE_KEY.JWT, jwt);
            })
            .catch((e) => setErrorMessage(e.message))
            .then(() => setSubmit(false))
    }

    const disableSubmit = () => {
        return !(email.trim().length && password.trim().length && isValidEmailWeb(email))
    }

    return (
        <>
            <SuccessSnackBar message={successMessage} handleClose={() => setSuccessMessage('')} />
            {isSubmiting && <LinearProgress className="authentication-progress-linear" />}
            <Zoom in={true}>
                <Paper elevation={3} style={isSubmiting ? { marginTop: 0 } : {}}
                    className={(isSubmiting ? "disable-div" : "") + " authentication-card"}>
                    <div className="authentication-card-child">
                        <img src={loginImage} className="fit-image" style={{ marginTop: '20%' }} alt="login-image" />
                    </div>
                    <div className="authentication-card-child">
                        <div className="authentication-header login-header">
                            Login to Simply Library
                        </div>
                        <TextField
                            error={!isValidEmailWeb(email)}
                            helperText={(!isValidEmailWeb(email) ? "Incorrect Email Format" : "")}
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            variant="outlined"
                            className="text-field-80 login-text-field" />
                        <PasswordTextField className="login-text-field" value={password} onChange={setPassword} />
                        <div className="authentication-button-container">
                            <Button disabled={disableSubmit()} variant="contained"
                                color="primary" className="blue-grad-button"
                                onClick={() => doLogin()}>
                                LOGIN
                        </Button>
                        </div>
                        <div className="authentication-lower-text">
                            Don't have any account? <span onClick={openSignUp} className="link-text ml-2">sign up</span>
                        </div>
                        {errorMessage && <Alert className="authentication-error" severity="error">{errorMessage}</Alert>}
                    </div>
                </Paper>
            </Zoom>
        </>
    )
}