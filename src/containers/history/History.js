import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import TodoItems from '../../components/TodoItems/TodoItems';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';

class History extends Component {

    state = {
        todoItems: [],
        activeFilter: false,
        completedFilter: false,
        loading: false
    }

    componentDidMount() {
        //TODO handle Pagination
        this.setState({ loading: true })
        axios.get('/todos.json')
            .then(response => {
                let loadedTodoItems = [];
                for (const key in response.data) {
                    loadedTodoItems.push({ id: key, ...response.data[key] });
                }
                this.setState({ todoItems: loadedTodoItems, loading: false });
            })
            .catch(error => console.log(error));

    }

    render() {

        let todoItems = <Spinner />;

        if (!this.state.loading) {
            todoItems = (
                <Aux>
                    <TodoItems
                        items={this.state.todoItems}
                        enableActiveFilter={this.state.activeFilter}
                        enableCompletedFilter={this.state.completedFilter}
                        removed={this.removeTodoItemHandler}
                        checked={this.todoItemCompletedHandler} />
                </Aux>
            );
        }

        return todoItems;
    }
}

export default History;
