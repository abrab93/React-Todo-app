import axios from '../../axios';
import * as actionType from '../actions/actionsType';


const addTodoItemStart = () => {
    return { type: actionType.ADD_TODO_ITEM_START };
}

const addTodoItemSucess = (todoItem) => {
    return {
        type: actionType.ADD_TODO_ITEM_SUCCES,
        todoItem: todoItem
    };
}

const addTodoItemFail = (error) => {
    return {
        type: actionType.ADD_TODO_ITEM_FAIL,
        error: error
    };
}

export const addTodoItem = (todoItem) => {
    return dispatch => {
        dispatch(addTodoItemStart());
        axios.post('/todos.json', todoItem)
            .then(response => {
                const updateTodoItem = { id: response.data.name, ...todoItem };
                dispatch(addTodoItemSucess(updateTodoItem));
            })
            .catch(error => {
                dispatch(addTodoItemFail(error))
            });
    }
}

const removeTodoItemStart = () => {
    return { type: actionType.REMOVE_TODO_ITEM_START };
}

const removeTodoItemSuccess = (id) => {
    return {
        type: actionType.REMOVE_TODO_ITEM_SUCCES,
        itemId: id
    };
}

const removeTodoItemFail = () => {
    return { type: actionType.REMOVE_TODO_ITEM_FAIL };
}

export const removeTodoItem = (itemId) => {
    return dispatch => {
        dispatch(removeTodoItemStart());
        axios.delete('/todos/' + itemId + '.json')
            .then(response => {
                dispatch(removeTodoItemSuccess(itemId));
            })
            .catch(error => {
                dispatch(removeTodoItemFail())
            });
    };
}

const completeTodoItemStart = () => {
    return { type: actionType.COMPLETE_TODO_ITEM_START };
}
const completeTodoItemSuccess = (updatedItem) => {
    return {
        type: actionType.COMPLETE_TODO_ITEM_SUCCES,
        updatedItem: updatedItem
    };
}
const completeTodoItemFail = () => {
    return { type: actionType.COMPLETE_TODO_ITEM_FAIL };
}
export const completeTodoItem = (updatedItem) => {
    return dispatch => {
        dispatch(completeTodoItemStart());
        axios.put('/todos/' + updatedItem.id + '.json', updatedItem)
            .then(response => {
                dispatch(completeTodoItemSuccess(updatedItem));
            })
            .catch(error => {
                dispatch(completeTodoItemFail());
            });
    };
}

export const clearCompletedTodoItems = () => {
    return { type: actionType.CLEAR_COMPLETE_TODO_ITEMS };
}