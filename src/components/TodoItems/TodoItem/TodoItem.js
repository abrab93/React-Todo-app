import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './TodoItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const todoItem = (props) => {

    const itemClasses = [];

    if (props.completed) {
        itemClasses.push(classes.completed);
    }

    return (
        <Aux>
            <li className={itemClasses.join(' ')}>
                <div className="form-check col-lg-12">
                    <label className="form-check-label">
                        <input
                            className="checkbox"
                            type="checkbox"
                            onChange={props.checked}
                            checked={props.completed}
                            onClick={props.checked} /> {props.text} <i className="input-helper"></i>
                    </label>
                </div>
                <div className={classes.small}>{(new Date(props.createdAt)).toLocaleDateString()}</div>
                <i className="remove" onClick={props.removed}>
                    <FontAwesomeIcon icon={faWindowClose} style={{ color: '#405189' }} />
                </i>
            </li>
        </Aux>
    );
}

export default todoItem;