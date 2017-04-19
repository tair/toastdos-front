import React from "react";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
    }
];


class SubmissionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const tableData = this.props.submissions.map(d => ({
            // document: 
        }));
        return (
            <ReactTable
                columns={tableColumns}
                data={this.props.submissions}
                loading={this.props.loading}
            />
        );
    }
}

SubmissionTable.propTypes = {
    submissions: React.PropTypes.arrayOf(React.PropTypes.object),
    loading: React.PropTypes.bool.isRequired,
};

SubmissionTable.defaultProps = {
    // def default props...
};

export default SubmissionTable;
