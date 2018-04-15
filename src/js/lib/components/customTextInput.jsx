"use strict";

import React from 'react';
import PropTypes from 'prop-types';
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
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    inputRef: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    className: PropTypes.string,
    spellCheck: PropTypes.bool,
    inputId: PropTypes.string,
    required: PropTypes.bool,
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
