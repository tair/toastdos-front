"use strict";

import React from 'react';
import { Label, Button, Row, Col } from 'reactstrap';

import GenePicker from '../genePicker';
import CustomTextArea from 'lib/components/customTextArea';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <div>
                    <Label className="d-block">
                        Gene
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    geneLocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.geneLocalId}
                        />
                    </Label>
                </div>
                <div>
                    <Label className="d-block">Comment
                        <CustomTextArea name="comment"
                            onChange={event => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    comment: event.target.value
                                })
                            )}
                            value={this.props.annotationData.data.comment}
                            placeholder="Type your comment..."
                            className="comment-text-area"
                        >
                        </CustomTextArea>
                    </Label>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

export default Comment;
