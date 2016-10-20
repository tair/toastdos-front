"use strict"

import React, {PropTypes} from 'react';
import CounterControls from 'components/counterControls';
import CounterData from 'components/counterData';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // set initial state
        }
    }

    render() {
        return (
            <div className="counter-container">
                <CounterControls
                    {...this.props}
                />
                <CounterData
                    {...this.props}
                />
            </div>  
        )
    }
}


Counter.propTypes = {
    onPlusClick: PropTypes.func.isRequired,
    onSubClick: PropTypes.func.isRequired,
    onResetClick: PropTypes.func.isRequired,
    counterValue: PropTypes.number.isRequired,
    totalClicks: PropTypes.number.isRequired
}

export default Counter;
