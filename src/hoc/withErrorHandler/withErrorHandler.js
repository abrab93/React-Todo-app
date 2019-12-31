import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        constructor(props) {
            super(props);
            console.log('[withErrorHandler]', 'constructor');

            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });

            this.respInterceptor = axios.interceptors.response.use(response => response, error => this.setState({ error: error }));
        }

        componentWillUnmount() {
            console.log('[withErrorHandler]', 'componentWillUnmount');
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respIntercepto);
        }

        render() {
            return (
                <Aux>
                    <Modal shows={this.state.error}>
                        <p style={{ textAlign: 'center' }}>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrapedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
