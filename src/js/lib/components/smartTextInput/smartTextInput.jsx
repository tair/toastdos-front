import React from 'react';
import PropTypes from 'prop-types';
import CustomTextInput from '../customTextInput';
import SuggestionList from './subcomponents/suggestionList';

class SmartTextInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            value: props.value,
            selectedItemId: props.valueId,
            hoveredItemId: null,
            hoveredItemIndex: null,
            showSuggestions: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this);
        this.handleSuggestionHover = this.handleSuggestionHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const newState = {};
        if(JSON.stringify(nextProps.suggestionIndex) !== JSON.stringify(this.props.suggestionIndex)) {
            newState.hoveredItemId = null;
            newState.hoveredItemIndex = null;
            newState.selectedItemId = null;
        }

        if(nextProps.value !== this.state.value) {
            newState.value = nextProps.value;
        }


        this.setState(newState);
    }

    handleInputChange(event) {
        this.setState({
            value: event.target.value,
            showSuggestions: true,
            hoveredItemId: null,
            hoveredItemIndex: null
        });
        this.props.onChange({name:event.target.value});
    }

    handleFocus(event) {
        this.setState({
            focused: true,
            showSuggestions: true
        });

        this.props.onFocus(event);
    }

    handleBlur(event) {
        this.setState({
            focused: false,
            showSuggestions: false
        });

        this.props.onBlur(event);
    }

    handleDismiss() {
        this.setState({
            focused: false,
            showSuggestions: false
        });
    }

    handleSuggestionSelect(id) {
        if (this.props.suggestionOrder.length == 0) {
            return;
        }
        if (id == null) {
            id = this.props.suggestionOrder[0];
        }
        this.setState({
            selectedItemId: id,
            value: this.props.suggestionIndex[id].name,
            showSuggestions: false
        });
        this.props.onSelect(id, this.props.suggestionIndex[id]);
    }

    handleSuggestionHover(id, index) {
        this.setState({
            hoveredItemId: id,
            hoveredItemIndex: index
        });
    }

    handleClick() {
        if(this.state.focused) {
            this.setState({
                showSuggestions: true
            });
        }
    }

    handleKeyDown(event) {
        // 40 - down
        // 38 - up
        // 13 - enter
        if((!this.state.showSuggestions) || (this.props.suggestionOrder.length <= 0)) {
            if(event.keyCode === 40) {
                this.setState({
                    showSuggestions: true
                });
            }
            return; // do nothing
        }
        let newState = {};
        switch(event.keyCode) {
        case 40:
            newState.hoveredItemIndex = (
                this.state.hoveredItemIndex != null ? (
                    (this.state.hoveredItemIndex + 1) < this.props.suggestionOrder.length  ?
                    (this.state.hoveredItemIndex + 1) : this.state.hoveredItemIndex
                ) : 0
            );

            newState.hoveredItemId = this.props.suggestionOrder[newState.hoveredItemIndex];
            break;
        case 38:
            newState.hoveredItemIndex = (
                this.state.hoveredItemIndex != null ? (
                    (this.state.hoveredItemIndex - 1) >= 0  ?
                    (this.state.hoveredItemIndex - 1) : this.state.hoveredItemIndex
                ) : 0
            );

            newState.hoveredItemId = this.props.suggestionOrder[newState.hoveredItemIndex];
            break;
        case 13:
            this.handleSuggestionSelect(this.state.hoveredItemId);
            return;
        }

        this.setState(newState);
    }

    render() {
        return (
            <span onMouseDown={this.handleClick} onKeyDown={this.handleKeyDown}>
                <CustomTextInput
                    onChange={this.handleInputChange}
                    value={this.state.value}
                    placeholder={this.state.value.length <= 0 ? this.props.placeholder : ""}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    inputRef={r => this.inputRef = r}
                    spellCheck={false}
                    required={true}
                />
                {
                    (this.state.focused && this.state.showSuggestions) ?
                    (
                        <div style={{position: "relative", zIndex: 1010}}>
                            <SuggestionList
                                suggestionOrder={this.props.suggestionOrder}
                                suggestionIndex={this.props.suggestionIndex}
                                fetching={this.props.fetchingSuggestions}
                                onItemHover={this.handleSuggestionHover}
                                onItemSelect={this.handleSuggestionSelect}
                                className={`${this.props.className}-suggestions`}
                                inputLength={this.state.value.length}
                                minSuggestLength={this.props.minSuggestLength}
                                hoveredSuggestionId={this.state.hoveredItemId}
                                dismiss={this.handleDismiss}
                            />
                        </div>
                    ) : null
                }
            </span>
        );
    }
}

SmartTextInput.propTypes = {
    suggestionLimit: PropTypes.number,
    fetchingSuggestions: PropTypes.bool,
    suggestionIndex: PropTypes.object,
    suggestionOrder: PropTypes.array,
    value: PropTypes.string,
    valueId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    minSuggestLength: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSelect: PropTypes.func,
    className: PropTypes.string,
    required: PropTypes.bool,
};

SmartTextInput.defaultProps = {
    suggestionIndex: {},
    suggestionOrder: [],
    fetchingSuggestions: false,
    suggestionLimit: 5,
    value: "",
    valueId: null,
    placeholder: "",
    minSuggestLength: 0,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onSelect: () => {},
    className: "smart-text-input",
    required: false,
};

export default SmartTextInput;
