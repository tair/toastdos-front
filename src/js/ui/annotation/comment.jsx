"use strict";

import React from 'react';
import { Label, Button, Row, Col } from 'reactstrap';
import GenePicker from 'modules/connectedComponents/gene/picker';
import CustomTextArea from 'lib/components/customTextArea';
import LabelInputRow from 'ui/labelInputRow';

class CommentAnnotation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LabelInputRow title="Gene">
                    <GenePicker
                        geneOrder={this.props.geneOrder}
                        typeLocalId={this.props.localId}
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.commentAnnotation, {
                                geneLocalId: value
                            })
                        )}
                        value={this.props.commentAnnotation.geneLocalId}
                    />
                </LabelInputRow>
                <LabelInputRow title="Comment">
                    <CustomTextArea name="comment"
                        onChange={event => this.props.onDataChange(
                            Object.assign({}, this.props.commentAnnotation, {
                                comment: event.target.value
                            })
                        )}
                        value={this.props.commentAnnotation.comment}
                        placeholder="Add a comment describing this gene..."
                        className="comment-text-area form-control"
                        required={true}
                    >
                    </CustomTextArea>
                </LabelInputRow>
            </div>
        );
    }
}

CommentAnnotation.propTypes = {
    commentAnnotation: React.PropTypes.object,
    geneOrder: React.PropTypes.array,
    onDataChange: React.PropTypes.func,
};

export default CommentAnnotation;
