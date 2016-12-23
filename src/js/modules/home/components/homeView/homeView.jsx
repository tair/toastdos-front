"use strict";

import React from 'react';

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // set initial state
        };
    }

    render() {
        return (
            <div>
                <h1>Welcome Home!</h1>
            </div>  
        );
    }
}


HomeView.propTypes = {
    
};

export default HomeView;

