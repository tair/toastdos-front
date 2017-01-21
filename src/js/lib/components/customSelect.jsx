"use strict";

import React from "react";

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            focused: false
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus() {
        this.setState({
            focused: true
        });
    } 

    handleBlur() {
        this.setState({
            focused: false
        });
    }

    render() {

        let classes = ["custom-select"];

        if(this.state.focused) {
            classes.push("focused");
        }

        return (
            <div className={classes.join(" ")}>
                <select
                    name={this.props.name}
                    id={this.props.id}
                    onChange={this.props.onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    {this.props.children}
                </select>
                <div className="arrow">
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

CustomSelect.propTypes = {
    name: React.PropTypes.string,
    id: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    onChange: React.PropTypes.func
};

CustomSelect.defaultProps = {
    name: "",
    id: "",
    value: "",
    onChange: () => {}
};

export default CustomSelect;
