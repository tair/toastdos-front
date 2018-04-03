"use strict";

import React from 'react';
import GenePicker from 'modules/connectedComponents/gene/picker';
import KeywordTextInput from 'modules/connectedComponents/keywordTextInput';
import LabelInputRow from 'ui/labelInputRow';
import { annotationTypes } from 'domain/annotation/constants';
import ValidatedField from 'modules/connectedComponents/validatedField';

class GeneGeneAnnotation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LabelInputRow title="Gene 1">
                    <GenePicker
                        geneOrder={this.props.geneOrder}
                        typeLocalId={this.props.localId}
                        onChange={value => this.props.updateGene1(value)}
                        value={this.props.geneGeneAnnotation.gene1LocalId}
                    />
                </LabelInputRow>
                <LabelInputRow title="Gene 2">
                    <GenePicker
                        geneOrder={this.props.geneOrder}
                        typeLocalId={this.props.localId}
                        onChange={value => this.props.updateGene2(value)}
                        value={this.props.geneGeneAnnotation.gene2LocalId}
                    />
                </LabelInputRow>
                <ValidatedField isValid={this.props.isValid}
                    invalidMessage="A gene gene annotation requires a method."
                >
                <LabelInputRow title="Method">
                    <KeywordTextInput
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.geneGeneAnnotation, {
                                methodName: value.name,
                                methodId: null,
                                methodExternalId: "",
                                methodEvidenceCode: "",
                            })
                        )}
                        onSelect={(id, value) => this.props.onDataChange(
                            Object.assign({}, this.props.geneGeneAnnotation, {
                                methodName: value.name,
                                methodId: value.id,
                                methodExternalId: value.external_id,
                                methodEvidenceCode: "",
                            })
                        )}
                        placeholder="e.g. Enzyme Assay"
                        value={this.props.geneGeneAnnotation.methodName}
                        searchScope="eco"
                        minSuggestLength={0}
                        annotationType={annotationTypes.PROTEIN_INTERACTION}
                        required={true}
                    />
                </LabelInputRow>
                </ValidatedField>
            </div>
        );
    }
}

GeneGeneAnnotation.propTypes = {
    geneGeneAnnotation: React.PropTypes.object,
    geneOrder: React.PropTypes.array,
    isValid: React.PropTypes.bool,
    onDataChange: React.PropTypes.func,
    updateGene1: React.PropTypes.func,
    updateGene2: React.PropTypes.func,
};

export default GeneGeneAnnotation;
