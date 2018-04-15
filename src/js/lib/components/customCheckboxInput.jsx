import React from 'react';
import PropTypes from 'prop-types';
import "css/customCheckboxInput.scss";

class CustomCheckboxInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
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
        this.state.focused ? classes.push("focused") : null;
        return (
            <div className={classes.join(" ")}>
                <input
                    type="checkbox"
                    id={this.props.inputId}
                    value={this.props.value}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

CustomCheckboxInput.propTypes = {
    checked: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    inputId: PropTypes.string,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
};

CustomCheckboxInput.defaultProps = {
    checked: false,
    value: "",
    onChange: () => {},
    inputId: "",
    className: "custom-checkbox-input",
    onFocus: () => {},
    onBlur: () => {}
};


export default CustomCheckboxInput;
