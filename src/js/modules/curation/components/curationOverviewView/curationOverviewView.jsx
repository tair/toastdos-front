import React from 'react';
import "css/curationView.scss";

import SearchFilter from './subcomponents/searchFilter';



class CurationOverviewView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    render() {
        return (
            <div className="curation-view-container">
              <div className="curation-view">
                <h1>Submission Curation</h1>
                <div className="curation-filter-container">
                    <h2>Filter</h2>
                    <SearchFilter />
                </div>
                <div className="curation-table-container">
                    Curation List
                </div>
              </div>
            </div>
        );
    }
}

export default CurationOverviewView;
