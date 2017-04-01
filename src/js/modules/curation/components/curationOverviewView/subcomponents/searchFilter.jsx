import React from 'react';

import CustomTextInput from 'lib/components/customTextInput';
import CustomCheckboxInput from 'lib/components/customCheckboxInput';

class SearchFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            reviewedChecked: false,
            pendingChecked: true,
        };

        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleReviewedChange = this.handleReviewedChange.bind(this);
        this.handlePendingChange = this.handlePendingChange.bind(this);
        
    }

    handleSearchValueChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }

    handleSearchSubmit(event) {
        event.preventDefault();
    }

    handleReviewedChange(event) {
        this.setState({
            reviewedChecked: event.target.checked
        });
    }

    handlePendingChange(event) {
        this.setState({
            pendingChecked: event.target.checked
        });
    }

    render() {
        return (
            <div className="search-filter">
                <form onSubmit={this.handleSearchSubmit}>
                    <label>
                        Search
                        <br/>
                        <CustomTextInput
                            onChange={this.handleSearchValueChange}
                            value={this.state.searchValue}
                            inputId="search"
                            placeholder="Search"
                        />
                    </label>
                    <br/>
                    <div className="filter-toggles">
                        <div className="checkbox">
                            <label>
                                <CustomCheckboxInput
                                    checked={this.state.reviewedChecked}
                                    onChange={this.handleReviewedChange}
                                />
                                <span>Reviewed</span>
                            </label>
                        </div>
                        <br/>
                        <div className="checkbox">
                            <label>
                                <CustomCheckboxInput
                                    checked={this.state.pendingChecked}
                                    onChange={this.handlePendingChange}
                                />
                                <span>Pending</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

SearchFilter.propTypes = {
    className: React.PropTypes.string
};

SearchFilter.defaultProps = {
    className: "",
};


export default SearchFilter;
