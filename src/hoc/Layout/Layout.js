import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

class Layout extends Component {

    render() {
        return (
            <Aux>
                <div className="page-content page-container" id="page-content">
                    <div className="padding">
                        <div className="row container d-flex justify-content-center">
                            <div className="col-lg-12">
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