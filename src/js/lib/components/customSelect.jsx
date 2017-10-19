"use strict";

import React from "react";
import 'css/customSelect.scss';
import { Input } from 'reactstrap';

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            focused: false,
            value: props.value
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleFocus(event) {
        this.setState({
            focused: true
        });
    } 

    handleBlur(event) {
        this.setState({
            focused: false
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }


    render() {

        let classes = ["custom-select"];

        if(this.state.focused) {
            classes.push("focused");
        }

        return (
            <Input type="select" className={classes.join(" ")}
                name={this.props.name}
                id={this.props.id}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.value}
            >
                {this.props.children}
            </Input>
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
