import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Today from './containers/Today/Today'
import History from './containers/History/History';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Authentication from './containers/Authentication/Authentication';

class App extends Component {


    render() {

        return (
            <BrowserRouter>
                <Layout >
                    <Switch>
                        <Route path="/history" component={History} />
                        <Route path="/today" component={Today} />
                        <Route path="/auth" component={Authentication} />
                        <Redirect from="/" to="/today" />
                        {/* <Today /> */}
                        {/* <History /> */}
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }

}

export default App;
