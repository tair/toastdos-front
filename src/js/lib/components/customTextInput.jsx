"use strict";

import React from 'react';

class CustomTextInput extends React.Component {
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
        this.props.onFocus(event);
    }

    handleBlur(event) {
        this.setState({
            focused: false
        });

        this.props.onBlur(event);
    }

    render() {

        let classes = ["custom-text-input"];

        if(this.state.focused) {
            classes.push('focused');
        }

        return (
            <div style={this.props.style} className={classes.join(" ")}>
                <input
                    type="text"
                    onChange={this.props.onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.props.onKeyDown}
                    disabled={this.props.disabled}
                    ref={this.props.inputRef}
                />
            </div>
        );
    }
}

CustomTextInput.propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    inputRef: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    style: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,

};

CustomTextInput.defaultProps = {
    disabled: false,
    onChange: () => {},
    value: "",
    placeholder: "",
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    inputRef: () => {}
};

export default CustomTextInput;
