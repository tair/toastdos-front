"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, Form, ListGroupItem } from 'reactstrap';
import 'css/submissionView.scss';
import PublicationField from 'modules/connectedComponents/publication/field';
import GeneList from 'modules/connectedComponents/gene/list';
import AnnotationList from 'modules/connectedComponents/annotation/list';
import SubmissionReadOnly from 'modules/connectedComponents/submissionReadOnly';
import SubmissionInfoPanel from 'ui/submission/infoPanel';
import SubmissionFooter from 'ui/submission/footer';
import SubmissionStructure from 'ui/submission/structure';

const DRAFT_SAVE_INTERVAL = 5000;

class SubmissionView extends React.Component {
    constructor(props) {
        super(props);

        this.props.initialize();

        this.state = {
            draftSaveTimer: null,
            showDraftSaved: false,
        };
    }

    componentDidMount() {
        let draftSaveTimer = setInterval(this.props.saveDraft, DRAFT_SAVE_INTERVAL);
        this.setState({ draftSaveTimer });
    }

    componentWillUnmount() {
        clearInterval(this.state.draftSaveTimer);
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.draftNumber != this.props.draftNumber) {
            this.setState({showDraftSaved: true});
            setTimeout(() => {
                this.setState({showDraftSaved: false});
            }, 1000);
        }
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
                reviewValidatedFields={this.props.reviewValidatedFields}
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
                                <PublicationField localId={this.props.publicationLocalId}
                                    reviewValidated={this.props.reviewValidated}/>
                            </ListGroupItem>
                            <ListGroupItem className="border-left-0 border-right-0">
                                <GeneList
                                    geneOrder={this.props.geneOrder}
                                    annotationOrder={this.props.annotationOrder}
                                    addAnnotation={this.props.addAnnotation}
                                    addGene={this.props.addGene}
                                    removeGene={this.props.removeGene}
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
                                    reviewValidated={this.props.reviewValidated}
                                />
                            </ListGroupItem>
                        </ListGroup>
                    }
                </Form>
                <div className="saved-status-container">
                    <div className={(this.state.showDraftSaved? 'show': '') + ' saved-status'}>
                        <span className="fa fa-check" /> Saved
                    </div>
                </div>
            </SubmissionStructure>
        );
    }
}

SubmissionView.propTypes = {
    submit: PropTypes.func,
    preview: PropTypes.func,
    edit: PropTypes.func,
    resetSubmission: PropTypes.func,
    initialize: PropTypes.func,
    submitting: PropTypes.bool,
    submitted: PropTypes.bool,
    previewing: PropTypes.bool,
    canSubmit: PropTypes.bool,
    errorMessage: PropTypes.string,
    curating: PropTypes.bool,
    publicationLocalId: PropTypes.string,
    geneOrder: PropTypes.array,
    annotationOrder: PropTypes.array,
    addAnnotation: PropTypes.func,
    removeAnnotation: PropTypes.func,
    addGene: PropTypes.func,
    removeGene: PropTypes.func,
    hasValidGene: PropTypes.bool,
    saveDraft: PropTypes.func,
    reviewValidated: PropTypes.number,
    reviewValidatedFields: PropTypes.func,
    draftNumber: PropTypes.number,
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
    saveDraft: () => {},
    reviewValidated: 0,
    reviewValidatedFields: () => {},
    hasValidGene: false,
    draftNumber: 0,
};

export default SubmissionView;
