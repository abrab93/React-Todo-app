import React, { Component } from 'react';
import classes from './Authentication.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        isSignin: true
    }

    componentDidMount() {
        this.props.onCheckAuthenticationStatus();
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
        const authData = {
            email: this.state.controles.email.value,
            password: this.state.controles.password.value
        };

        this.props.onAuthentication(authData, this.state.isSignin);
    }

    switchSignTypeHandler = () => {
        this.setState(prevState => {
            return { isSignin: !prevState.isSignin };
        });
    }

    render() {

        const formElements = [];
        let form = null;
        let errorMsg = null;
        let redirect = null;

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

        if (this.props.error) {
            errorMsg = (<p>{this.props.error.message}</p>)
        }

        if (this.props.isAuthenticated) {
            redirect = <Redirect to='/today' />;
        }

        if (this.props.loading) {
            form = <Spinner />
        }


        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Success</Button>
                </form>
                <Button
                    clicked={this.switchSignTypeHandler}
                    btnType='Danger'>Switch to {this.state.isSignin ? 'Signup' : 'Signin'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthentication: (authData, isSignin) => dispatch(actions.authentication(authData, isSignin)),
        onCheckAuthenticationStatus: () => dispatch(actions.checkAuthStatus())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
