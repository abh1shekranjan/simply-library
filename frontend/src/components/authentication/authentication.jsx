import React, { useState } from 'react';
import './authentication.css';
import SignIn from './signin';
import SignUp from './signup';

export default function Authentication() {

    const [isSigninOpened, openSignIn] = useState(true);

    return (
        <>

            {isSigninOpened ?
                <SignIn openSignUp={() => openSignIn(false)} />
                :
                <SignUp openSignIn={() => openSignIn(true)} />
            }

        </>
    )
}