"use strict";

import React from 'react';
import { Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import CustomTextArea from 'lib/components/customTextArea';
import LabelInputRow from '../../../labelInputRow';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <LabelInputRow title="Gene">
                    <GenePicker
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                geneLocalId: value
                            })
                        )}
                        value={this.props.annotationData.data.geneLocalId}
                    />
                </LabelInputRow>
                <LabelInputRow title="Comment">
                    <CustomTextArea name="comment"
                        onChange={event => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                comment: event.target.value
                            })
                        )}
                        value={this.props.annotationData.data.comment}
                        placeholder="Type your comment..."
                        className="comment-text-area form-control"
                        required={true}
                    >
                    </CustomTextArea>
                </LabelInputRow>
            </div>
        );
    }
}

Comment.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

export default Comment;
