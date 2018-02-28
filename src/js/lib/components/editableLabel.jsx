"use strict";

import React from 'react';

class EditableLabel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: (props.value ? props.value : ""),
            editing: false,
            valid: true
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleFocus() {
        this.setState({
            editing: true
        });
    }

    handleBlur() {
        this.props.onSubmit(this.state.value);
        this.setState({
            editing: false
        });
    }

    handleChange(event) {
        this.props.onChange(event);
        this.setState({
            value: event.target.value
        });
    }

    handleClick() {
        this.setState({
            editing: true
        });
    }

    handleKeypress(event) {
        // console.log(event.key);
        if(event.key === "Enter") {
            this.props.onSubmit(this.state.value);
            this.setState({
                editing: false
            });
        }

    }

    componentDidUpdate() {
        if(this.state.editing) {
            this.textInput ? this.textInput.focus() : null;
        } else {
            this.textInput ? this.textInput.blur() : null;
        }
    }

    render() {
        const labelContainerStyle = {
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingBottom: "3px"
        };

        const spanStyle = {
            lineHeight: "normal",
            overflowY: "visible",
            verticalAlign: "middle",
            maxWidth: "calc(100% - 25px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block"
        };

        const inputStyle = {
            width: "calc(100% - 25px)",
            padding: "0",
            margin: "0",
            border: "none",
            backgroundColor: "transparent",
            // color: "#FFFFFF",
            lineHeight: "normal",
            verticalAlign: "middle",
            fontSize: "inherit",
            fontFamily: "inherit"
        };

        const edutGlyphStyle = {
            marginLeft: "5px",
            cursor: 'pointer',
            verticalAlign: "bottom"
        };

        let label = (<span style={spanStyle}>{this.state.value}</span>);

        if(this.state.editing || this.state.value == "") {
            label = (
                <input
                    ref={(input) => this.textInput = input}
                    type={this.props.inputType}
                    style={inputStyle}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onKeyPress={this.handleKeypress}
                />
            );
        }

        return (
            <div
                style={labelContainerStyle}
                className={
                    [
                        this.props.className,
                        this.state.editing ? (this.props.editingClassName) : null
                    ].join(" ")
                }
                onClick={this.handleClick}
            >
                {label}
                {this.state.editing ? null : (
                    <i style={edutGlyphStyle} className="fa fa-pencil"></i>
                )}
            </div>
        );
    }
}

EditableLabel.propTypes = {
    validate: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    // style Properties
    className: React.PropTypes.string,
    editingClassName: React.PropTypes.string,
    inputType: React.PropTypes.string
};

EditableLabel.defaultProps = {
    validate: () => true,
    onSubmit: () => {},
    onChange: () => {},
    classNamne: "",
    editingClassName: "",
    inputType: "text"
};

export default EditableLabel;
