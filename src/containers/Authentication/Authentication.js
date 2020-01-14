import React, { Component } from 'react';
import classes from './Authentication.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';

class Authentication extends Component {

    state = {
        controles: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    inputChangeHandler = (event, elementIdentifier) => {
        const updatedControles = updateObject(this.state.controles, {
            [elementIdentifier]: updateObject(this.state.controles[elementIdentifier], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(this.state.controles[elementIdentifier].validation, event.target.value)
            })
        });

        this.setState({ controles: updatedControles });
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    switchSignTypeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {

        const formElements = [];
        let form = null;

        for (const key in this.state.controles) {
            formElements.push({
                elemId: key,
                elemConf: this.state.controles[key]
            });
        };


        form = formElements.map(el => {
            return <Input key={el.elemId}
                elementType={el.elemConf.elementType}
                value={el.elemConf.value}
                elementConfig={el.elemConf.elementConfig}
                touched={el.elemConf.touched}
                valid={el.elemConf.valid}
                changed={(event) => this.inputChangeHandler(event, el.elemId)} />
        })


        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Success</Button>
                </form>
                <Button
                    clicked={this.switchSignTypeHandler}
                    btnType='Danger'>Switch to {!this.state.isSignup ? 'Signup' : 'Signin'}</Button>
            </div>
        )
    }
}

export default Authentication
