import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const writeConrol = (props) => {
    return (
        <Aux>
            <div className="add-items d-flex">
                <input
                    type="text"
                    value={props.value}
                    onChange={props.changed}
                    onKeyPress={props.clicked}
                    className="form-control todo-list-input"
                    placeholder="What do you need to do today?" />
                {/* <button
                    className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button> */}
            </div>
        </Aux>
    );
}

export default writeConrol;