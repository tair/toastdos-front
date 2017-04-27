import React from 'react';
import "css/curationView.scss";

import SearchFilter from './subcomponents/searchFilter';
import SubmissionTable from './subcomponents/submissionTable';



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
                <div className="curation-table-container">
                    <h2>Curation List</h2>
                    <SubmissionTable
                        loading={this.props.loading}
                        submissions={this.props.submissions}
                        loadSubmissions={this.props.loadSubmissions}
                        totalPages={this.props.totalPages}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currPage}
                    />
                </div>
              </div>
            </div>
        );
    }
}

CurationOverviewView.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    loadSubmissions: React.PropTypes.func,
    submissions: React.PropTypes.arrayOf(React.PropTypes.object),
    totaPages: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    currPage: React.PropTypes.number
};

CurationOverviewView.defaultProps = {
    loadSubmissions: () => {}
};

export default CurationOverviewView;
