//there's no need for a history reducer, i can easly re-use today reducer but i want to do like that in order to introduce combine reducers concept to the mind
import * as actionTypes from '../actions/actionsType';
const initalState = {
    todoItems: [],
    loading: false
}

const reducer = (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_TODO_ITEMS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_TODO_ITEMS_SUCCESS:
            let loadedTodoItems = [];
            for (const key in action.todoItemsData) {
                loadedTodoItems.push({ id: key, ...action.todoItemsData[key] });
            }
            return {
                ...state,
                todoItems: loadedTodoItems,
                loading: false
            };
        case actionTypes.FETCH_TODO_ITEMS_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;;
    }
}

export default reducer;

