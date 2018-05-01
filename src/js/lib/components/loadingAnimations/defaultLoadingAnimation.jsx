"use strict";

import React from 'react';

class DefaultLoadingAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state
        };
    }

    render() {

        let containerStyle = {
            width: "100%",
            height: "100vh",
            textAlign: "center",
            margin: "0 auto",
            position: "relative"
        };

        let childStyle = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1.8em",
            color: "white"
        };

        return (
            <div style={containerStyle}>
                <div style={childStyle}>
                    <span>Loading...</span>
                </div>
            </div>
        );
    }
}

export default DefaultLoadingAnimation;
