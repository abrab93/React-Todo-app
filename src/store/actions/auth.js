import * as actionTypes from './actionsType';
import axios from 'axios';

const authBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const api_key = 'AIzaSyCgjyB1Lr4Wq-SVVdfydmTBU4E2Dgzi-aw';

export const authentication = (authData) => {
    return dispatch => {
        dispatch(authenticationStart());
        const bodyPayload = {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        };
        axios.post(authBaseUrl + 'signInWithPassword?key=' + api_key, bodyPayload)
            .then(response => {
                console.log(response.data);
                dispatch(authenticationSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authenticationFail(err.response.data.error.message));
            });
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

