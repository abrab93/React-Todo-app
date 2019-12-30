import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Today from './containers/today/Today'
import History from './containers/history/History';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {


    render() {

        return (
            <BrowserRouter>
                <Layout >
                    <Switch>
                        <Route path="/history" component={History} />
                        <Route path="/today" component={Today} />
                        <Route path="/" component={Today} />
                        {/* <Today /> */}
                        {/* <History /> */}
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }

}

export default App;
