"use strict";

import React from 'react';

class Home extends React.Component {
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


Home.propTypes = {
    
};

export default Home;

