import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import TodoItems from '../../components/TodoItems/TodoItems';

class History extends Component {

    state = {
        todoItems: [],
        activeFilter: false,
        completedFilter: false
    }

    componentDidMount() {
        this.setState({
            todoItems: [
                { id: 1, text: 'text' },
                { id: 2, text: 'text' },
                { id: 3, text: 'text' }
            ]
        });
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
