import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import TodoItems from '../../components/TodoItems/TodoItems';
import axios from '../../axios';

class History extends Component {

    state = {
        todoItems: [],
        activeFilter: false,
        completedFilter: false
    }

    componentDidMount() {
        axios.get('/todos.json')
            .then(response => {
                let loadedTodoItems = [];
                for (const key in response.data) {
                    loadedTodoItems.push({ id: key, ...response.data[key] });
                }
                this.setState({ todoItems: loadedTodoItems });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Aux>
                <TodoItems
                    items={this.state.todoItems}
                    enableActiveFilter={this.state.activeFilter}
                    enableCompletedFilter={this.state.completedFilter}
                    removed={this.removeTodoItemHandler}
                    checked={this.todoItemCompletedHandler} />
            </Aux>
        )
    }
}

export default History
