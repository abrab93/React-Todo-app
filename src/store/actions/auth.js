import * as actionTypes from './actionsType';
import axios from 'axios';

const authBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const api_key = 'AIzaSyCgjyB1Lr4Wq-SVVdfydmTBU4E2Dgzi-aw';

export const authentication = (authData, isSignin) => {
    return dispatch => {
        dispatch(authenticationStart());
        const bodyPayload = {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        };
        let authEndpoint = authBaseUrl + 'signInWithPassword?key=' + api_key;
        if (!isSignin) {
            authEndpoint = authBaseUrl + 'signUp?key=' + api_key
        }
        axios.post(authEndpoint, bodyPayload)
            .then(response => {
                dispatch(authenticationSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthExpiration(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authenticationFail(err.response.data.error));
            });
    }
}

export const logout = () => {
    return { type: actionTypes.AUTHENTICATION_LOGOUT };
}

const checkAuthExpiration = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    }
}

const authenticationStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_START
    };
}

const authenticationSuccess = (token = null, userId = null) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        token: token,
        userId: userId
    };
}

const authenticationFail = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAIL,
        error: error
    };
}

