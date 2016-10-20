"use strict"

import React, {PropTypes} from 'react';
import NavigationBar from './navigationBar';

class NavigationFrame extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // set initial state
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <div>
                    {this.props.children}
                </div>
            </div>  
        )
    }
}


NavigationFrame.propTypes = {
    // proptypes
}

export default NavigationFrame;