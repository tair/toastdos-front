"use strict";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GeneGeneAnnotation from 'ui/annotation/geneGene';
import { annotationStatusFormats } from 'domain/annotation/constants';
import {
    update,
    updateGene1,
    updateGene2,
} from 'domain/geneGeneAnnotation/actions';
import {
    geneGeneAnnotationSelector,
    geneGeneAnnotationValidSelector,
    geneGeneAnnotationValidIdSelector,
} from 'domain/geneGeneAnnotation/selectors';

const ConnectedGeneGeneAnnotation = connect(
    (state, ownProps) => ({
        geneGeneAnnotation: geneGeneAnnotationSelector(state, ownProps.localId),
        isValid: ownProps.curating &&
            ownProps.annotationStatus == annotationStatusFormats.ACCEPTED ?
            geneGeneAnnotationValidIdSelector(state, ownProps.localId) :
            geneGeneAnnotationValidSelector(state, ownProps.localId),
    }),
    (dispatch, ownProps) => ({
        onDataChange: (data) => dispatch(update(ownProps.localId, data)),
        updateGene1: (gene1LocalId) => dispatch(updateGene1(ownProps.localId, gene1LocalId)),
        updateGene2: (gene2LocalId) => dispatch(updateGene2(ownProps.localId, gene2LocalId)),
    })
)(GeneGeneAnnotation);

ConnectedGeneGeneAnnotation.propTypes = {
    localId: PropTypes.string,
    curating: PropTypes.bool,
};

export default ConnectedGeneGeneAnnotation;
