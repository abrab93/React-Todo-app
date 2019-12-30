import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import { NavLink } from 'react-router-dom';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-lg-12">
                                <nav className={classes.Layout}>
                                    <ul>
                                        <li>
                                            <NavLink to='/today' activeClassName={classes.selected}>Today</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to='/history' activeClassName={classes.selected}>History</NavLink>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="card px-3">
                                    <div className="card-body">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    };
}

export default Layout;