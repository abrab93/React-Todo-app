import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Input.module.css';


const Input = (props) => {

    let inputClasses = [classes.InputElement].concat("form-control").concat("todo-list-input");

    console.log(props.valid);

    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    console.log(inputClasses);

    return (
        <Aux>
            <div className={classes.Input}>
                <input
                    type={props.elementType}
                    value={props.value}
                    onChange={props.changed}
                    onKeyPress={props.keyPressed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig} />
                {!props.valid && props.touched ? <small className={classes.ValidationError}>{props.errorMsg}</small> : null}
            </div>
        </Aux>
    )
}

export default Input;
