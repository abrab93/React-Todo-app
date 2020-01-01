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

    let todoItem = (
        <li>
            <div className={itemClasses.concat('form-check col-lg-11').join(' ')}>
                <label className="form-check-label">
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={props.checked}
                        checked={props.completed}
                        onClick={props.checked} /> <i className="input-helper"></i>
                    {props.text}
                </label>
            </div>
            <div className={classes.small}>{(new Date(props.createdAt)).toLocaleDateString()}</div>
            <i className="remove" onClick={props.removed}>
                <FontAwesomeIcon icon={faWindowClose} style={{ color: '#405189' }} />
            </i>
        </li>
    )

    if (!props.handleActions) {
        todoItem = (
            <li>
                <div className={itemClasses.concat('form-check col-lg-11').join(' ')}>
                    <label className="form-check-label">
                        <input
                            className="checkbox"
                        /> {props.text} <i className="input-helper"></i>
                    </label>
                </div>
                <div className={classes.small}>
                    {props.completed ? <div>{'Completed'}</div> : null}
                    {(new Date(props.createdAt)).toLocaleDateString()}
                </div>
            </li>
        )
    }

    return (
        <Aux>
            {todoItem}
        </Aux>
    );
}

export default todoItem;