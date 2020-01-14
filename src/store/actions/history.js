import * as actionsType from "./actionsType";
import axios from '../../axios';

const fetchDataStart = () => {
    return { type: actionsType.FETCH_TODO_ITEMS_START }
}

const fetchDataSucess = (data) => {
    return {
        type: actionsType.FETCH_TODO_ITEMS_SUCCESS,
        todoItemsData: data
    }
}

const fetchDataFail = () => {
    return { type: actionsType.FETCH_TODO_ITEMS_FAIL }
}

export const fetchTodoItems = (token, userId) => {
    return dispatch => {
        dispatch(fetchDataStart());
        axios.get('/todos.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
            .then(response => {
                dispatch(fetchDataSucess(response.data));
            })
            .catch(error => {
                dispatch(fetchDataFail());
            });

    }
}