import React, { Component } from 'react';
import classes from './Modal.module.css';

class Modal extends Component {

    render() {
        return (
            <div
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateX(0)' : 'translateX(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        )
    }
}

export default Modal;
