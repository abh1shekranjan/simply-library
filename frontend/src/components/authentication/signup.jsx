import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import React, { useState } from 'react';
import { signUpImage } from '../../imageUrl';
import TextField from '@material-ui/core/TextField';
import PasswordTextField from '../common/password-field';
import Button from '@material-ui/core/Button';
import { isValidEmailWeb } from '../../common/emailHandler';
import { isValidNameWeb } from '../../common/nameHandler';
import { signinApi } from '../../api-handler/authentication';
import { LOCAL_STORAGE_KEY, saveItemToLocalStorage } from '../../common/localStorageHandler';
import Alert from '@material-ui/lab/Alert';
import { SuccessSnackBar } from '../common/snackbar';

export default function SignUp(props) {
    const { openSignIn } = props;
    const [isSubmiting, setSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const doSignup = () => {
        // creating the request body
        const body = {
            email: email.trim(),
            name: name.trim(),
            password: password.trim(),
            type: 'USER'

        }
        // init messeges
        setErrorMessage('');
        setSubmit(true)

        Promise.resolve()
            .then(() => signinApi(body)) // request to login
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
        return !(email.trim().length && password.trim().length && isValidEmailWeb(email)
            && name.trim().length&& isValidNameWeb(name))
    }

    return (
        <>
            <SuccessSnackBar message={successMessage} handleClose={() => setSuccessMessage('')} />
            {isSubmiting && <LinearProgress className="authentication-progress-linear" />}
            <Zoom in={true}>
                <Paper elevation={3} style={isSubmiting ? { marginTop: 0 } : {}}
                    className={(isSubmiting ? "disable-div" : "") + " authentication-card "}>
                    <div className="authentication-card-child">
                        <img src={signUpImage} className="fit-image" style={{ marginTop: '20%' }} alt="login-image" />
                    </div>
                    <div className="authentication-card-child">
                        <div className="authentication-header signup-header">
                            Create an account
                        </div>
                        {/* write your code here */}
                        <TextField
                            error={!isValidNameWeb(name)}
                            helperText={(!isValidNameWeb(name) ? "Special charecter not allowed" : "")}
                            value={name}
                            type="Name"
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            variant="outlined"
                            className="text-field-80 login-text-field" />
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
                                onClick={() => doSignup()}>
                                SIGN UP
                        </Button>
                        </div>
                        <div className="authentication-lower-text">
                            Already have an account? <span onClick={openSignIn} className="link-text ml-2">sign in</span>
                        </div>
                        {errorMessage && <Alert className="authentication-error" severity="error">{errorMessage}</Alert>}
                    </div>
                </Paper>
            </Zoom>
        </>
    )
}