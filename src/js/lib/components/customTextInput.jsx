"use strict";

import React from 'react';
import { Input } from 'reactstrap';
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

        return (
                <Input type="text"
                    className="form-control"
                    onChange={this.props.onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.props.onKeyDown}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    ref={this.props.inputRef}
                    spellCheck={this.props.spellCheck}
                    id={this.props.inputId}
                    required={this.props.required ? "required" : ""}
                    style={{textOverflow: "ellipsis"}}
                >
                    {this.props.children}
                </Input>
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
    readOnly: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    style: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    className: React.PropTypes.string,
    spellCheck: React.PropTypes.bool,
    inputId: React.PropTypes.string,
    required: React.PropTypes.bool,
};

CustomTextInput.defaultProps = {
    disabled: false,
    readOnly: "",
    onChange: () => {},
    value: "",
    placeholder: "",
    onBlur: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    inputRef: () => {},
    className: "custom-text-input",
    inputId: "",
    required: false,
};

export default CustomTextInput;
