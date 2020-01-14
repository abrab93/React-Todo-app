import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Today from './containers/Today/Today'
import History from './containers/History/History';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Authentication from './containers/Authentication/Authentication';
import Logout from './containers/Authentication/Logout/Logout';
import { connect } from 'react-redux';

class App extends Component {


    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Authentication} />
                <Redirect from="/" to="/auth" />
            </Switch>
        )

        if (this.props.isAuthenticated) {
            routes = (<Switch>
                <Route path="/history" component={History} />
                <Route path="/today" component={Today} />
                <Route path="/auth" component={Authentication} />
                <Route path="/logout" component={Logout} />
                <Redirect from="/" exact to="/today" />
            </Switch>)
        }

        return (
            <BrowserRouter>
                <Layout >
                    {routes}
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(App);
