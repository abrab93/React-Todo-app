import React, { Component } from 'react';
import TodoItems from '../../components/TodoItems/TodoItems';
import WriteControl from '../../components/WriteControl/WriteControl';
import Filters from '../../components/Filters/Filters';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios';

class Today extends Component {

    state = {
        todoItems: [],
        todoItemText: '',
        activeFilter: false,
        completedFilter: false
    }

    addTodoItemHandler = (event) => {
        if (event.key === 'Enter') {
            if (this.state.todoItemText.trim() !== '') {
                const todoItem = { id: (new Date()).getTime(), text: this.state.todoItemText, completed: false, createdAt: new Date() };
                axios.post('/todos.json', todoItem)
                    .then(response => {
                        console.log(response.data);
                        this.setState((prevState) => {
                            return {
                                todoItems: prevState.todoItems.concat(todoItem),
                                todoItemText: ''
                            }
                        });
                    })
                    .catch(error => console.log(error));
            }
        }

    }

    removeTodoItemHandler = (itemId) => {
        this.setState({ todoItems: this.state.todoItems.filter(item => item.id !== itemId) });
    }

    todoItemTextChangedHandler = (event) => {
        this.setState({ todoItemText: event.target.value });
    }

    todoItemCompletedHandler = (itemId) => {

        const todoItemIndex = this.state.todoItems.findIndex(elem => elem.id === itemId);
        const updatedItem = { ...this.state.todoItems[todoItemIndex] }
        updatedItem.completed = !updatedItem.completed;

        const updateTodoItems = [...this.state.todoItems];
        updateTodoItems[todoItemIndex] = updatedItem;

        this.setState({ todoItems: updateTodoItems });
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
        this.setState({ todoItems: this.state.todoItems.filter(item => item.completed === false) });
    }


    render() {

        return (
            <Aux>
                <h4 className="card-title">Awesome Todo list</h4>
                <WriteControl
                    value={this.state.todoItemText}
                    clicked={(event) => this.addTodoItemHandler(event)}
                    changed={(event) => this.todoItemTextChangedHandler(event)} />
                <TodoItems
                    items={this.state.todoItems}
                    enableActiveFilter={this.state.activeFilter}
                    enableCompletedFilter={this.state.completedFilter}
                    removed={this.removeTodoItemHandler}
                    checked={this.todoItemCompletedHandler} />
                {this.state.todoItems.length > 0 ?
                    <Filters
                        todoItems={this.state.todoItems}
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

export default Today
