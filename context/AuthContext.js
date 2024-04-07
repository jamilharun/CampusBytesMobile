import React, { createContext } from 'react'
import { Alert } from 'react-native';
import { useAuth0 } from 'react-native-auth0'


// auth0 login system

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const {authorize, clearSession, user, error, getCredentials, isLoading} = useAuth0()
    
    const onLogin = async () => {
        try {
            await authorize();
            let credentials = await getCredentials();
            // Alert.alert('AccessToken: ' + credentials.accessToken);
        } catch (e) {
            console.log(e);
        }
    };

    const loggedIn = user !== undefined && user !== null;

    const onLogout = async () => {
    try {
        await clearSession();
    } catch (e) {
        console.log('Log out cancelled');
    }
    };

    return (
        <AuthContext.Provider value={{ user, error, onLogin, onLogout, isLoading, loggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}