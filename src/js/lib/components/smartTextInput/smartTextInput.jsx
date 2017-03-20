import React from 'react';
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
            showSuggestions: true
        });
        this.props.onChange(event.target.value);
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

    handleSuggestionSelect(id) {
        this.setState({
            selectedItemId: id,
            value: this.props.suggestionIndex[id],
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

    handleClick(event) {
        if(this.state.focused) {
            this.setState({
                showSuggestions: true
            });
        }
    }

    render() {
        return (
            <span onMouseDown={this.handleClick}>
                <CustomTextInput
                    onChange={this.handleInputChange}
                    value={this.state.value}
                    placeholder={this.state.value.length <= 0 ? this.props.placeholder : ""}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    inputRef={r => this.inputRef = r}
                />
                {
                    (this.state.focused && this.state.showSuggestions) ?
                    (
                        <div style={{position: "relative", zIndex: 200}}>
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
                            />
                        </div>
                    ) : null

                }
            </span>
        );
    }
}

SmartTextInput.propTypes = {
    suggestionLimit: React.PropTypes.number,
    fetchingSuggestions: React.PropTypes.bool,
    suggestionIndex: React.PropTypes.object,
    suggestionOrder: React.PropTypes.arrayOf(
        React.PropTypes.string
    ),
    value: React.PropTypes.string,
    valueId: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    minSuggestLength: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    className: React.PropTypes.string
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
    className: "smart-text-input"
};

export default SmartTextInput;
