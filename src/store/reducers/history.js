//there's no need for a history reducer, i can easly re-use today reducer but i want to do like that in order to introduce combine reducers concept to the mind
import * as actionTypes from '../actions/actionsType';
import { updateObject } from '../../shared/utility';

const initalState = {
    todoItems: [],
    loading: false
}

const fetchTodItemsStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchTodItemsSuccess = (state, action) => {

    let loadedTodoItems = [];
    for (const key in action.todoItemsData) {
        loadedTodoItems.push({ id: key, ...action.todoItemsData[key] });
    }
    return updateObject(state, {
        todoItems: loadedTodoItems,
        loading: false
    });
}

const fetchTodItemsFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_TODO_ITEMS_START: return fetchTodItemsStart(state, action);
        case actionTypes.FETCH_TODO_ITEMS_SUCCESS: return fetchTodItemsSuccess(state, action);
        case actionTypes.FETCH_TODO_ITEMS_FAIL: return fetchTodItemsFail(state, action);
        default: return state;;
    }
}

export default reducer;

