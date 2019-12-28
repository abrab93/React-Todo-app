import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const filterItem = (props) => {
    return (
        <Aux>
            <li >
                <a href="#/" onClick={props.clicked} className={props.selectedCssClass} >{props.label}</a>
            </li>
            <span > </span>
        </Aux>
    )
}

export default filterItem;
