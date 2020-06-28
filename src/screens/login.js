import React, { useContext } from 'react';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../contexts/auth.context';
import Button from '@material-ui/core/Button';
import useStyles from '../styles/AppStyles';

function signOut() {
    Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

function Login(props) {
    const authy = useContext(AuthContext);
    const classes = useStyles();

    return (
        <div className={classes.App}>
            <p>
                {authy ? <Button variant="outlined" color="secondary" onClick={signOut}>Sign Out</Button> : <Button variant="outlined" color="primary" onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>Sign In with Google</Button>}
            </p>
        </div>
    )
}

export default Login