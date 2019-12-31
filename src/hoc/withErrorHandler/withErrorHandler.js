import React, { Component } from 'react'

const withErrorHandler = (WrapedComponent) => {
    return class extends Component {

        constructor(props) {
            super(props);
            console.log('[withErrorHandler]','constructor');
        }

        render() {
            return <WrapedComponent {...this.props} />
        }
    }
}

export default withErrorHandler;
