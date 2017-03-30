import React from 'react';
import "css/customCheckboxInput.scss";

class CustomCheckboxInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           
        };
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    render() {
        return (
            <div className={this.props.className}>
                <input
                    type="checkbox"
                    id={this.props.inputId}
                    value={this.props.value}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

CustomCheckboxInput.propTypes = {
    checked: React.PropTypes.bool,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    inputId: React.PropTypes.string,
    className: React.PropTypes.string,
};

CustomCheckboxInput.defaultProps = {
    checked: false,
    value: "",
    onChange: () => {},
    inputId: "",
    className: "custom-checkbox-input"
};


export default CustomCheckboxInput;
