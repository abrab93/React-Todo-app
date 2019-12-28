import React from 'react';
import classes from './Filters.module.css';
import FilterItem from './FilterItem/FilterItem';

const filters = (props) => {

    const activeItemsLength = props.todoItems.filter(item => item.completed === false).length;
    const completedItemLength = props.todoItems.filter(item => item.completed === true).length;

    return (
        <div className={classes.todoapp}>
            <footer className={classes.footer}>
                <span className={classes.todoCount}>
                    <strong >{activeItemsLength}</strong>
                    <span > </span>
                    <span >items</span>
                    <span > left</span>
                </span>
                <ul className={classes.filters}>
                    <FilterItem
                        label={'All'}
                        clicked={props.allClicked}
                        selectedCssClass={(!props.enableActiveFilter && !props.enableCompletedFilter) ? classes.selected : null} />
                    <FilterItem
                        label={'Active'}
                        clicked={props.activeClicked}
                        selectedCssClass={props.enableActiveFilter ? classes.selected : null} />
                    <FilterItem
                        label={'Completed'}
                        clicked={props.completedClicked}
                        selectedCssClass={props.enableCompletedFilter ? classes.selected : null} />
                </ul>
                {completedItemLength > 0 ? <button className={classes.clearCompleted} onClick={props.clearClicked} >Clear completed</button> : ''}
            </footer>
        </div>
    )
}

export default filters;
