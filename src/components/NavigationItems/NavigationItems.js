import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/today'>Today</NavigationItem>
            <NavigationItem link='/history'>History</NavigationItem>
            <NavigationItem link='/logout'>Logout</NavigationItem>
        </ul>
    )
}

export default NavigationItems;
