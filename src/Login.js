import { Button } from '@mui/material';
import React from 'react';
import { auth, provider } from './firebase';

import './Login.css';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

const Login = () => {

    const [{ user }, dispatch] = useStateValue();

    const signIn = () => {

        auth
        .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,

                });
                console.log(result.user);
            })
            .catch(error => {
                alert(error.message)
            })


    }

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://toppng.com/uploads/preview/slack-new-logo-icon-11609376883z32jbkf8kg.png"
                    alt="" />

                <h1>Sign in to Clever Programmer HQ</h1>
                <p>khalid.mahmud.slack.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>

            </div>

        </div>
    );
};

export default Login;