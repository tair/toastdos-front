import React from 'react';

import "css/curationView.scss";

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
                <div className="curation-filter-container">
                    Curation Filter
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
