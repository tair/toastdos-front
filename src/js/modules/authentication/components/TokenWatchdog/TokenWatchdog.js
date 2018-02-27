"use strict";

import React from 'react';

class TokenWatchdog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expTimeout: null
        };

        this.handleTokenChange = this.handleTokenChange.bind(this);
    }

    handleTokenChange(expirationTime) {
        this.state.expTimeout ? clearTimeout(this.state.expTimeout) : null;
        if(expirationTime) {
            const expiryDiff = this.props.expirationTime - Math.floor(Date.now() / 1000);
            const expTimeout = setTimeout(this.props.logout, expiryDiff * 1000);
            this.setState({
                expTimeout: expTimeout
            });
        }
    }

    componentWillMount() {
        if(this.props.expirationTime) {
            this.handleTokenChange(this.props.expirationTime);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.expirationTime !== this.props.expirationTime) {
            this.handleTokenChange(this.props.expirationTime);
        }
    }

    render() {
        return React.createElement('div');
    }
}

TokenWatchdog.propTypes = {
    expirationTime: React.PropTypes.number,
    logout: React.PropTypes.func

};

export default TokenWatchdog;
