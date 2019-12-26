import React, { PureComponent } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import TodoItem from './TodoItem/TodoItem';


class todoItems extends PureComponent {


    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.items !== nextProps.items;
    // }

    render() {
        const FiltredTodoItems = this.props.items.filter(item => {
            return this.props.enableActiveFilter
                ? item.completed === false
                : this.props.enableCompletedFilter
                    ? item.completed === true : true
        });

        const todoItems = FiltredTodoItems.map((item, index) => {
            return <TodoItem
                key={item.id}
                text={item.text}
                completed={item.completed}
                removed={() => this.props.removed(item.id)}
                checked={() => this.props.checked(item.id)} />
        });

        return (
            <Aux>
                <div className="list-wrapper">
                    <ul className="d-flex flex-column-reverse todo-list">
                        {todoItems}
                    </ul>
                </div>
            </Aux>
        );
    }
}

export default todoItems;