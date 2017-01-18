"use strict";

import React from 'react';
import PublicationField from '../publicationField';
import GeneList from '../geneList';
import AnnotationList from '../annotationList';

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
                <GeneList />
                <AnnotationList />
            </div>
        );
    }
}

export default SubmissionView;
