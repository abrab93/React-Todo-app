import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/auth';
import * as actionsTodo from '../../../store/actions/today'
import { Redirect } from 'react-router';

class Logout extends Component {

    componentDidMount() {
        this.props.onClearTodayTodoItem();
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/' />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onClearTodayTodoItem: () => dispatch(actionsTodo.clearTodayTodoItems())
    };
}

export default connect(null, mapDispatchToProps)(Logout);
