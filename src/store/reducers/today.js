import * as actionTypes from '../actions/actionsType';

const initialState = {
    todoItems: [],
    loading: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_TODO_ITEM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.ADD_TODO_ITEM_SUCCES:
            const updatedTodoItems = state.todoItems.concat(action.todoItem);
            return {
                ...state,
                todoItems: updatedTodoItems,
                loading: false
            };
        case actionTypes.ADD_TODO_ITEM_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.REMOVE_TODO_ITEM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.REMOVE_TODO_ITEM_SUCCES:
            return {
                todoItems: state.todoItems.filter(item => item.id !== action.itemId),
                loading: false
            };
        case actionTypes.REMOVE_TODO_ITEM_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.COMPLETE_TODO_ITEM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.COMPLETE_TODO_ITEM_SUCCES:
            const todoItemIndex = state.todoItems.findIndex(elem => elem.id === action.updatedItem.id);
            const updateTodoItems = [...state.todoItems];
            updateTodoItems[todoItemIndex] = action.updatedItem;
            return {
                todoItems: updateTodoItems,
                loading: false
            };
        case actionTypes.COMPLETE_TODO_ITEM_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.CLEAR_COMPLETE_TODO_ITEMS:
            return {
                ...state,
                todoItems: state.todoItems.filter(item => item.completed === false)
            }
        default:
            return state;
    }
}

export default reducer;