import React from 'react';

class SuggestionList extends React.Component {
    constructor(props) {
        super(props);

        this.makeListBody = this.makeListBody.bind(this);
        this.generateListElement = this.generateListElement.bind(this);
        this.listItemClick = this.listItemClick.bind(this);
        this.listItemHover = this.listItemHover.bind(this);
    }

    listItemClick(id) {
        this.props.onItemSelect(id);
    }

    listItemHover(id, index) {
        this.props.onItemHover(id, index);
    }

    generateListElement(suggestionId, index) {
        return (
            <li
                key={`suggestion-${suggestionId}`}
                className={this.props.hoveredSuggestionId === suggestionId ? "selected" : ""}
                onClick={() => this.listItemClick(suggestionId)}
                onMouseOver={() => this.listItemHover(suggestionId, index)}
                ref={r => (this.props.hoveredSuggestionId === suggestionId) ? (this.hoveredRef = r) : null}
            >
                {typeof this.props.suggestionIndex[suggestionId] == 'object'? 
                    this.props.suggestionIndex[suggestionId].name :
                    this.props.suggestionIndex[suggestionId]}
            </li>
        );
    }

    makeListBody() {
        if (this.props.fetching && this.props.suggestionOrder.length === 0) {
            return (<span>Fetching...</span>);
        } else if(this.props.inputLength < this.props.minSuggestLength) {
            return (<span>Type more for suggestions...</span>);
        } else if(this.props.suggestionOrder.length < 1) {
            return (<span>No Results</span>);
        } else {
            return (
                <div>
                    <ul>
                        {this.props.suggestionOrder.map(this.generateListElement)}
                    </ul>
                </div>
            );
        }
    }

    handleMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    componentDidUpdate() {
        if (this.hoveredRef && this.listContainer) {
            if(
                (this.hoveredRef.offsetTop + this.hoveredRef.clientHeight) > (this.listContainer.scrollTop + this.listContainer.clientHeight)
            ) {
                this.listContainer.scrollTop = (
                    (this.hoveredRef.offsetTop + this.hoveredRef.clientHeight)
                    - this.listContainer.clientHeight
                );
            } else if (this.hoveredRef.offsetTop < this.listContainer.scrollTop) {
                this.listContainer.scrollTop = this.hoveredRef.offsetTop;
            }
        }
    }

    render() {
        return (
            <div
                className={this.props.className}
                ref={r => this.listContainer = r}
                onMouseDown={this.handleMouseDown}
            >
                {this.makeListBody()}
            </div>
        );
    }
}

SuggestionList.propTypes = {
    suggestionOrder: React.PropTypes.array,
    suggestionIndex: React.PropTypes.object,
    hoveredSuggestionId: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    fetching: React.PropTypes.bool,
    inputLength: React.PropTypes.number,
    minSuggestLength: React.PropTypes.number,
    onItemSelect: React.PropTypes.func,
    onItemHover: React.PropTypes.func,
    className: React.PropTypes.string
};

SuggestionList.defaultPropa = {
    suggestionOrder: [],
    suggestionIndex: {},
    hoveredSuggestionId: null,
    fetching: false,
    inputLength: 0,
    minSuggestLength: 0,
    onItemSelect: () => {},
    onItemHover: () => {},
    className: "",

};

export default SuggestionList;
