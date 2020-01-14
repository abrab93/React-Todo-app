import * as actionTypes from '../actions/actionsType';
import { updateObject } from '../../shared/utility';

const initialState = {
    todoItems: [],
    loading: false
};

const addTodoItemSuccess = (state, action) => {
    const updatedTodoItems = state.todoItems.concat(action.todoItem);
    return updateObject(state, {
        todoItems: updatedTodoItems,
        loading: false
    });
}

const addTodoItemStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const addTodoItemFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const removeTodoItemStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const removeTodoItemSuccess = (state, action) => {
    return updateObject(state, {
        todoItems: state.todoItems.filter(item => item.id !== action.itemId),
        loading: false
    });
}

const removeTodoItemFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const completeTodoItemStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const completeTodoItemSucces = (state, action) => {

    const todoItemIndex = state.todoItems.findIndex(elem => elem.id === action.updatedItem.id);
    const updateTodoItems = [...state.todoItems];
    updateTodoItems[todoItemIndex] = action.updatedItem;

    return updateObject(state, {
        todoItems: updateTodoItems,
        loading: false
    });
}

const completeTodoItemFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const clearTodoItems = (state, action) => {
    return updateObject(state, {
        todoItems: state.todoItems.filter(item => item.completed === false)
    });
}

const clearTodayTodoItems = (state, action) => {
    return updateObject(state, {
        todoItems: []
    });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_TODO_ITEM_START: return addTodoItemStart(state, action);
        case actionTypes.ADD_TODO_ITEM_SUCCES: return addTodoItemSuccess(state, action);
        case actionTypes.ADD_TODO_ITEM_FAIL: return addTodoItemFail(state, action);
        case actionTypes.REMOVE_TODO_ITEM_START: return removeTodoItemStart(state, action);
        case actionTypes.REMOVE_TODO_ITEM_SUCCES: return removeTodoItemSuccess(state, action);
        case actionTypes.REMOVE_TODO_ITEM_FAIL: return removeTodoItemFail(state, action);
        case actionTypes.COMPLETE_TODO_ITEM_START: return completeTodoItemStart(state, action);
        case actionTypes.COMPLETE_TODO_ITEM_SUCCES: return completeTodoItemSucces(state, action);
        case actionTypes.COMPLETE_TODO_ITEM_FAIL: return completeTodoItemFail(state, action);
        case actionTypes.CLEAR_COMPLETE_TODO_ITEMS: return clearTodoItems(state, action);
        case actionTypes.CLEAR_TODAY_TODO_ITEMS: return clearTodayTodoItems(state, action);
        default: return state;
    }
}

export default reducer;