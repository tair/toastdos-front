"use strict";

import React from 'react';
import { Row, Col, ListGroup, Form, ListGroupItem } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationField from 'modules/connectedComponents/publication/field';
import GeneList from 'modules/connectedComponents/gene/list';
import AnnotationList from 'modules/connectedComponents/annotation/list';
import CurationReadOnly from 'ui/curation/viewReadOnly';
import SubmissionInfoPanel from 'ui/submission/infoPanel';
import CurationFooter from 'ui/curation/footer';
import SubmissionStructure from 'ui/submission/structure';

class CurationView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.requestSubmission(this.props.routeParams.submissionId);
    }


    render() {
        const infoPanel = (
            <SubmissionInfoPanel
                submitting={this.props.submitting}
                submitted={this.props.submitted}
                errorMessage={this.props.errorMessage}
            />);

        const header = (
            <Row className="align-items-center" >
                <Col>
                    <span className="fa fa-file-text" /> Curate Submission from&nbsp;
                    {this.props.submitter ? this.props.submitter.name : "..."} at&nbsp;
                    {this.props.submittedAt ? new Date(this.props.submittedAt).toLocaleString() : "..."}
                </Col>
            </Row>
        );

        const footer = (
            <CurationFooter
                previewing={this.props.previewing}
                submitted={this.props.submitted}
                canSubmit={this.props.canSubmit}
                submit={this.props.submit}
                preview={this.props.preview}
                edit={this.props.edit}
                hasPendingAnnotations={this.props.hasPendingAnnotations}
            />
        );

        return (
            <SubmissionStructure
                infoPanel={infoPanel}
                header={header}
                footer={footer}
            >
                <Form className="submission-form-container">
                    {this.props.previewing ?
                        <CurationReadOnly
                            publicationLocalId={this.props.publicationLocalId}
                            geneOrder={this.props.geneOrder}
                            annotationOrder={this.props.annotationOrder}
                            curating={true}
                        />
                    :
                        <ListGroup>
                            <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                                <PublicationField localId={this.props.publicationLocalId}/>
                            </ListGroupItem>
                            <ListGroupItem className="border-left-0 border-right-0">
                                <GeneList
                                    geneOrder={this.props.geneOrder}
                                    annotationOrder={this.props.annotationOrder}
                                    addGene={this.props.addGene}
                                    removeGene={this.props.removeGene}
                                    curating={true}
                                />
                            </ListGroupItem>
                            <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                                <AnnotationList
                                    annotationOrder={this.props.annotationOrder}
                                    geneOrder={this.props.geneOrder}
                                    addAnnotation={this.props.addAnnotation}
                                    removeAnnotation={this.props.removeAnnotation}
                                    hasValidGene={this.props.hasValidGene}
                                    curating={true}
                                />
                            </ListGroupItem>
                        </ListGroup>
                    }
                </Form>
            </SubmissionStructure>
        );
    }
}

CurationView.propTypes = {
    routeParams: React.PropTypes.shape({
        submissionId: React.PropTypes.string
    }).isRequired,
    requestSubmission: React.PropTypes.func,
    submit: React.PropTypes.func,
    preview: React.PropTypes.func,
    edit: React.PropTypes.func,
    resetSubmission: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    submitted: React.PropTypes.bool,
    previewing: React.PropTypes.bool,
    canSubmit: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
    publicationLocalId: React.PropTypes.string,
    geneOrder: React.PropTypes.array,
    annotationOrder: React.PropTypes.array,
    addAnnotation: React.PropTypes.func,
    removeAnnotation: React.PropTypes.func,
    addGene: React.PropTypes.func,
    removeGene: React.PropTypes.func,
    hasValidGene: React.PropTypes.bool,
    hasPendingAnnotations: React.PropTypes.bool,
};

CurationView.defaultProps = {
    submit: () => {},
    preview: () => {},
    edit: () => {},
    publicationLocalId: '',
    geneOrder: [],
    annotationOrder: [],
    addAnnotation: () => {},
    removeAnnotation: () => {},
    addGene: () => {},
    removeGene: () => {},
    hasValidGene: false,
    hasPendingAnnotations: false,
};

export default CurationView;
