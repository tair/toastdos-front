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
                    <h5>Gene</h5>
                    <GenePicker
                        onChange={value => this.props.onDataChange(
                            Object.assign({}, this.props.annotationData.data, {
                                geneLocalId: value
                            })
                        )}
                        value={this.props.annotationData.data.geneLocalId}
                    />
                </div>
                <div>
                    <Label>Comment
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
