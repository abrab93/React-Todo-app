import React from 'react';
import classes from './Filters.module.css';

const filters = (props) => {

    return (
        <div className={classes.todoapp}>
            <footer className={classes.footer}>
                <span className={classes.todoCount}>
                    <strong >{props.activeItemsLength}</strong>
                    <span > </span>
                    <span >items</span>
                    <span > left</span>
                </span>
                <ul className={classes.filters}>
                    <li >
                        <a href="#/" onClick={props.allClicked} className={classes.selected} >All</a>
                    </li>
                    <span > </span>
                    <li >
                        <a href="#/active" onClick={props.activeClicked} className="" >Active</a>
                    </li>
                    <span > </span>
                    <li >
                        <a href="#/completed" onClick={props.completedClicked} className="" >Completed</a>
                    </li>
                </ul>
                {props.completedItemLength > 0 ? <button className={classes.clearCompleted} onClick={props.clearClicked} >Clear completed</button> : ''}
            </footer>
        </div>
    )
}

export default filters;
