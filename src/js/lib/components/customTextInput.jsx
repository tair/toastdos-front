"use strict";

import React from 'react';
import 'css/customTextInput.scss';

class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            focused: false
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus(event) {
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
        let classes = [this.props.className];

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
                    spellCheck={this.props.spellCheck}
                    id={this.props.inputId}
                />
                {this.props.children}
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
    className: React.PropTypes.string,
    spellCheck: React.PropTypes.bool,
    inputId: React.PropTypes.string

};

CustomTextInput.defaultProps = {
    disabled: false,
    onChange: () => {},
    value: "",
    placeholder: "",
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    inputRef: () => {},
    className: "custom-text-input",
    inputId: ""
};

export default CustomTextInput;
