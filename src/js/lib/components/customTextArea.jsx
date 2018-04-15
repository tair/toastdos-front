"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import 'css/customTextArea.scss';


class CustomTextArea extends React.Component {
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

        let classes = ["custom-text-area", this.props.className];

        if(this.state.focused) {
            classes.push('focused');
        }

        return (
            <div className={classes.join(" ")} style={this.props.containerStyle}>
                <textarea
                    style={this.props.textAreaStyle}
                    name={this.props.name}
                    id={this.props.id}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.props.onChange}
                    required={this.props.required}
                >
                    {this.props.children}
                </textarea>
            </div>
        );
    }
}

CustomTextArea.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    containerStyle: PropTypes.object,
    textAreaStyle: PropTypes.object,
    className: PropTypes.string,
    required: PropTypes.bool,
};

CustomTextArea.defaultProps = {
    name: "",
    id: "",
    value: "",
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    containerStyle: {},
    textAreaStyle: {},
    className: "",
    required: false,
};


export default CustomTextArea;
