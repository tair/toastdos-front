import React from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router';

const tableColumns = [
    {
        header: 'Document ID',
        accessor: 'document'
    },
    {
        id: 'pending',
        header: 'Pending',
        accessor: p => (p.pending > 0 ? 'Pending' : 'Reviewed')
    },
    {
        header: '# Annotations',
        accessor: 'total'
    },
    {
        id: 'date',
        header: 'Date Submitted',
        accessor: p => {
            const dateObj = new Date(p.submission_date);
            return dateObj.toLocaleString();
        },
    },
    {
        id: 'edit',
        header: 'View Details',
        accessor: p => (
            <Link to={`/curation/detail/${p.id}`}>Details</Link>
        )
    }
];


class SubmissionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10
        };

        this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange(state, instance) {
        console.log(state);
        this.props.loadSubmissions();
    }

    render() {
        return (
            <ReactTable
                columns={tableColumns}
                data={this.props.submissions}
                loading={this.props.loading}
                defaultPageSize={10}
                manual={true}
                pages={10}
                onChange={this.handleTableChange}
                // showFilters={true}
            />
        );
    }
}

SubmissionTable.propTypes = {
    submissions: React.PropTypes.arrayOf(React.PropTypes.object),
    loading: React.PropTypes.bool.isRequired,
    loadSubmissions: React.PropTypes.func,
};

SubmissionTable.defaultProps = {
    // def default props...
};

export default SubmissionTable;
