"use strict";

import React from 'react';
import {Alert, Row, Col, ListGroup, Form,
    ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationField from 'modules/connectedComponents/publication/field';
import GeneList from 'modules/connectedComponents/gene/list';
import AnnotationList from 'modules/connectedComponents/annotation/list';
import SubmissionReadOnly from 'modules/connectedComponents/submissionReadOnly';
import SubmissionInfoPanel from 'ui/submission/infoPanel';
import SubmissionFooter from 'ui/submission/footer';
import SubmissionStructure from 'ui/submission/structure';

class SubmissionView extends React.Component {
    constructor(props) {
        super(props);

        this.props.initialize();
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
                    <span className="fa fa-file-text" /> {
                        this.props.curating ?
                            "Curate Submission"
                        :
                            "New Annotation Submission"
                        }
                </Col>
            </Row>
        );

        const footer = (
            <SubmissionFooter
                previewing={this.props.previewing}
                submitted={this.props.submitted}
                canSubmit={this.props.canSubmit}
                submit={this.props.submit}
                preview={this.props.preview}
                edit={this.props.edit}
                resetSubmission={this.props.resetSubmission}
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
                        <SubmissionReadOnly
                            publicationLocalId={this.props.publicationLocalId}
                            geneOrder={this.props.geneOrder}
                            annotationOrder={this.props.annotationOrder}
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
                                    addAnnotation={this.props.addAnnotation}
                                    addGene={this.props.addGene}
                                    removeGene={this.props.removeGene}
                                />
                            </ListGroupItem>
                            <ListGroupItem className="border-left-0 border-right-0 border-bottom-0">
                                <AnnotationList
                                    annotationOrder={this.props.annotationOrder}
                                    geneOrder={this.props.geneOrder}
                                    addAnnotation={this.props.addAnnotation}
                                    removeAnnotation={this.props.removeAnnotation}
                                    hasValidGene={this.props.hasValidGene}
                                />
                            </ListGroupItem>
                        </ListGroup>
                    }
                </Form>
            </SubmissionStructure>
        );
    }
}

SubmissionView.propTypes = {
    submit: React.PropTypes.func,
    preview: React.PropTypes.func,
    edit: React.PropTypes.func,
    resetSubmission: React.PropTypes.func,
    initialize: React.PropTypes.func,
    submitting: React.PropTypes.bool,
    submitted: React.PropTypes.bool,
    previewing: React.PropTypes.bool,
    canSubmit: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
    curating: React.PropTypes.bool,
    publicationLocalId: React.PropTypes.string,
    geneOrder: React.PropTypes.array,
    annotationOrder: React.PropTypes.array,
    addAnnotation: React.PropTypes.func,
    removeAnnotation: React.PropTypes.func,
    addGene: React.PropTypes.func,
    removeGene: React.PropTypes.func,
    hasValidGene: React.PropTypes.bool,
};

SubmissionView.defaultProps = {
    submit: () => {},
    preview: () => {},
    edit: () => {},
    initalize: () => {},
    curating: false,
    publicationLocalId: '',
    geneOrder: [],
    annotationOrder: [],
    addAnnotation: () => {},
    removeAnnotation: () => {},
    addGene: () => {},
    removeGene: () => {},
    hasValidGene: false,
};

export default SubmissionView;
