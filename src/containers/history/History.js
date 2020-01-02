import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import TodoItems from '../../components/TodoItems/TodoItems';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/history';
import { connect } from 'react-redux';

class History extends Component {

    state = {
        todoItems: [],
        activeFilter: false,
        completedFilter: false,
        loading: false
    }

    componentDidMount() {
        //TODO handle Pagination
        this.props.onFetchTodoItems();
    }

    render() {

        let todoItems = <Spinner />;

        if (!this.props.loading) {
            todoItems = (
                <Aux>
                    <TodoItems
                        items={this.props.todoItems}
                        enableActiveFilter={this.state.activeFilter}
                        enableCompletedFilter={this.state.completedFilter}
                        removed={null}
                        checked={null} />
                </Aux>
            );
        }

        return todoItems;
    }
}

const mapStatToProps = state => {
    return {
        todoItems: state.history.todoItems,
        loading: state.history.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTodoItems: () => dispatch(actions.fetchTodoItems())
    }
}

export default connect(mapStatToProps, mapDispatchToProps)(withErrorHandler(History, axios));
