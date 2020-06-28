import React, { createContext, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

export const AuthContext = createContext();

export function AuthProvider(props) {
    const [auth, setAuth] = useState(false);
    const updateAuth = (authState) => {
        setAuth(authState);
    }
    
    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            // eslint-disable-next-line default-case
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => setAuth(userData));
                    break;
                case 'signOut':
                    setAuth(false);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });

        getUser().then(userData => userData ? setAuth(userData) : setAuth(false));
    }, []);

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then(userData => userData)
            .catch(() => console.log('Not signed in'));
    }

    return (
        <AuthContext.Provider value={auth} updateAuth={updateAuth}>
            {props.children}
        </AuthContext.Provider>
    );
}