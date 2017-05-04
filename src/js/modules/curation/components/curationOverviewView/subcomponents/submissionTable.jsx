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
        accessor: p => (p.pending > 0 ? 'Pending' : 'Reviewed'),
        sortable: false,
    },
    {
        id: 'annotations',
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
        ),
        sortable: false, 
    }
];


class SubmissionTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleTableChange = this.handleTableChange.bind(this);

        this.state = {
            tableSort: [{id: 'date', desc: true}]
        };
    }

    componentWillMount() {
        this.props.loadSubmissions(1, 10);
    }

    handleTableChange(state, instance) {        
        this.props.loadSubmissions(
            state.page + 1,
            state.pageSize,
            state.sorting[0].id,
            state.sorting[0].desc ? 'desc' : 'asc'
        );

        this.setState({
            tableSort: state.sorting
        });
    }

    render() {
        return (
            <ReactTable
                columns={tableColumns}
                data={this.props.submissions}
                loading={this.props.loading}
                defaultPageSize={10}
                manual={true}
                pages={this.props.totalPages}
                onChange={this.handleTableChange}
                defaultSorting={this.state.tableSort}
                // page={this.props.currentPage}
                // showFilters={true}
            />
        );
    }
}

SubmissionTable.propTypes = {
    submissions: React.PropTypes.arrayOf(React.PropTypes.object),
    loading: React.PropTypes.bool.isRequired,
    loadSubmissions: React.PropTypes.func,
    // todo handle pagination
    totalPages: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    currentPage: React.PropTypes.number,
};

SubmissionTable.defaultProps = {
    // def default props...
};

export default SubmissionTable;
