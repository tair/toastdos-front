"use strict";

import React from 'react';
import PublicationField from '../publicationField';

const containerStyle = {
    padding: "17px"
};

class SubmissionView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={containerStyle}>
                <h1>New Annotation Submission</h1>
                <PublicationField />
            </div>
        );
    }
}

export default SubmissionView;
