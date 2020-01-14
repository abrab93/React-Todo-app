import * as actionTypes from '../actions/actionsType';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null
}

const authenticationStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const authenticationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
    });
}

const authenticationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const authenticationLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_START: return authenticationStart(state);
        case actionTypes.AUTHENTICATION_SUCCESS: return authenticationSuccess(state, action);
        case actionTypes.AUTHENTICATION_FAIL: return authenticationFail(state, action);
        case actionTypes.AUTHENTICATION_LOGOUT: return authenticationLogout(state, action);
        default: return state;
    }
}

export default reducer;