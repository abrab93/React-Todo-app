import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        // console.log(this.props.show !== nextProps.show, this.props.children !== nextProps.children);
        return this.props.show !== nextProps.show && this.props.children !== nextProps.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateX(0)' : 'translateX(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;
