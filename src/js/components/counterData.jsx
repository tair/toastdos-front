"use strict"

import React, { PropTypes } from 'react';

// define component class by extending React.Component
class CounterData extends React.Component {
    /**
     * CounterControls Constructor
     * @param  {Object} props - Component Properties
     */
    constructor(props) {
        super(props)

        this.state = {
            // initial component state
        }
    }

    /**
     * Render the CounterControlds
     * @return {React.Element} - the rendered elment
     */
    render() {
        return (
            <div className="counter-display">
                <div className="counter-display-title">Counter Value</div>
                <div className="counter-display-value">
                    {this.props.counterValue}
                </div>
                <div className="counter-display-title">Total Clicks</div>
                <div className="counter-display-value">
                    {this.props.totalClicks}
                </div>
            </div>
        )
    }
}

CounterData.propTypes = {
    counterValue: PropTypes.number.isRequired,
    totalClicks: PropTypes.number.isRequired
}

CounterData.defaultProps = {
    counterValue: 0,
    totalClicks: 0
}


export default CounterData;

