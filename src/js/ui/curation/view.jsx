"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, Form, ListGroupItem } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationField from 'modules/connectedComponents/publication/field';
import GeneList from 'modules/connectedComponents/gene/list';
import AnnotationList from 'modules/connectedComponents/annotation/list';
import CurationReadOnly from 'ui/curation/viewReadOnly';
import SubmissionInfoPanel from 'ui/submission/infoPanel';
import CurationFooter from 'ui/curation/footer';
import SubmissionStructure from 'ui/submission/structure';
import UserOrcidLink from 'ui/userOrcidLink';

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
                    {this.props.submitter ? <UserOrcidLink user={this.props.submitter} /> : "..."} at&nbsp;
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
                reviewValidatedFields={this.props.reviewValidatedFields}
            />
        );

        return (
            <SubmissionStructure
                infoPanel={infoPanel}
                header={header}
                footer={this.props.annotationListReviewed ? null : footer}
            >
                <Form className="submission-form-container">
                    {this.props.previewing || this.props.annotationListReviewed ?
                        <CurationReadOnly
                            publicationLocalId={this.props.publicationLocalId}
                            geneOrder={this.props.geneOrder}
                            annotationOrder={this.props.annotationOrder}
                            curating={true}
                        />
                    :
                        <ListGroup>
                            <ListGroupItem className="border-left-0 border-right-0 border-top-0">
                                <PublicationField localId={this.props.publicationLocalId}
                                    reviewValidated={this.props.reviewValidated}/>
                            </ListGroupItem>
                            <ListGroupItem className="border-left-0 border-right-0">
                                <GeneList
                                    geneOrder={this.props.geneOrder}
                                    annotationOrder={this.props.annotationOrder}
                                    addGene={this.props.addGene}
                                    removeGene={this.props.removeGene}
                                    curating={true}
                                    reviewValidated={this.props.reviewValidated}
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
                                    reviewValidated={this.props.reviewValidated}
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
    routeParams: PropTypes.shape({
        submissionId: PropTypes.string
    }).isRequired,
    requestSubmission: PropTypes.func,
    submit: PropTypes.func,
    preview: PropTypes.func,
    edit: PropTypes.func,
    resetSubmission: PropTypes.func,
    submitting: PropTypes.bool,
    submitted: PropTypes.bool,
    previewing: PropTypes.bool,
    canSubmit: PropTypes.bool,
    errorMessage: PropTypes.string,
    publicationLocalId: PropTypes.string,
    geneOrder: PropTypes.array,
    annotationOrder: PropTypes.array,
    addAnnotation: PropTypes.func,
    removeAnnotation: PropTypes.func,
    addGene: PropTypes.func,
    removeGene: PropTypes.func,
    hasValidGene: PropTypes.bool,
    reviewValidated: PropTypes.number,
    reviewValidatedFields: PropTypes.func,
    hasPendingAnnotations: PropTypes.bool,
    annotationListReviewed: PropTypes.bool,
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
    reviewValidated: 0,
    reviewValidatedFields: () => {},
    hasValidGene: false,
    hasPendingAnnotations: false,
    annotationListReviewed: true,
};

export default CurationView;
