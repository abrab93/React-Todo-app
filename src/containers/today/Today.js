import React, { Component } from 'react';
import TodoItems from '../../components/TodoItems/TodoItems';
import Filters from '../../components/Filters/Filters';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

class Today extends Component {

    state = {
        todoItemText: '',
        activeFilter: false,
        completedFilter: false,
        todoInputElement: {
            elementConfig: {
                type: 'text',
                placeholder: 'What do you need to do today?'
            },
            validation: {
                required: true,
                minLength: 4,
                maxLength: 30
            },
            valid: false,
            touched: false,
            errorMsg: 'Text length must be between 4 and 30 !!'
        }
    }

    addTodoItemHandler = (event) => {
        if (event.key === 'Enter') {
            if (this.state.todoInputElement.valid && checkValidity(this.state.todoInputElement.validation, this.state.todoItemText)) {
                const todoItem = { userId: this.props.userId, text: this.state.todoItemText, completed: false, createdAt: new Date() };
                this.props.onAddTodoItem(todoItem, this.props.token);
                this.setState({ todoItemText: '' });
            }
        }

    }

    removeTodoItemHandler = (itemId) => {
        this.props.onRemoveTodoItem(itemId, this.props.token);
    }

    todoItemTextChangedHandler = (event) => {
        const updatedTodoInputElement = { ...this.state.todoInputElement };
        updatedTodoInputElement.touched = true;
        updatedTodoInputElement.valid = checkValidity(updatedTodoInputElement.validation, event.target.value);
        this.setState({
            todoItemText: event.target.value,
            todoInputElement: updatedTodoInputElement
        });
    }

    todoItemCompletedHandler = (itemId) => {

        const todoItemIndex = this.props.todoItems.findIndex(elem => elem.id === itemId);
        const updatedItem = { ...this.props.todoItems[todoItemIndex] }
        updatedItem.completed = !updatedItem.completed;
        this.props.onCompleteTodoItem(updatedItem, this.props.token);
    }

    allClickedHandler = () => {
        this.setState({ activeFilter: false, completedFilter: false })
    }

    activeClickedHandler = () => {
        this.setState({ activeFilter: true, completedFilter: false })
    }

    completedClickedHandler = () => {
        this.setState({ activeFilter: false, completedFilter: true })
    }

    clearClickedHandler = () => {
        this.props.onClearCompletedTodoItems();
        //TODO handle delete for multiples items at the same time on firbase API
    }


    render() {

        let todoItems = <Spinner />;

        if (!this.props.loading) {
            todoItems = <TodoItems
                items={this.props.todoItems}
                enableActiveFilter={this.state.activeFilter}
                enableCompletedFilter={this.state.completedFilter}
                handleActions={true}
                removed={this.removeTodoItemHandler}
                checked={this.todoItemCompletedHandler} />
        }

        return (
            <Aux>
                <h4 className="card-title">Awesome Todo list</h4>
                <Input
                    value={this.state.todoItemText}
                    valid={this.state.todoInputElement.valid}
                    touched={this.state.todoInputElement.touched}
                    errorMsg={this.state.todoInputElement.errorMsg}
                    elementConfig={this.state.todoInputElement.elementConfig}
                    keyPressed={(event) => this.addTodoItemHandler(event)}
                    changed={(event) => this.todoItemTextChangedHandler(event)} />

                {todoItems}

                {this.props.todoItems.length > 0 ?
                    <Filters
                        todoItems={this.props.todoItems}
                        enableActiveFilter={this.state.activeFilter}
                        enableCompletedFilter={this.state.completedFilter}
                        allClicked={this.allClickedHandler}
                        activeClicked={this.activeClickedHandler}
                        completedClicked={this.completedClickedHandler}
                        clearClicked={this.clearClickedHandler}
                    /> : null}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        todoItems: state.today.todoItems,
        todoItemText: state.today.todoItems,
        loading: state.today.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchtoProps = dispatch => {
    return {
        onAddTodoItem: (todoItem, token) => dispatch(actions.addTodoItem(todoItem, token)),
        onRemoveTodoItem: (itemId, token) => dispatch(actions.removeTodoItem(itemId, token)),
        onCompleteTodoItem: (updatedTodoItem, token) => dispatch(actions.completeTodoItem(updatedTodoItem, token)),
        onClearCompletedTodoItems: () => dispatch(actions.clearCompletedTodoItems())
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withErrorHandler(Today, axios));
