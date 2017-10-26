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
                <Row className="align-items-end">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Gene
                        </Label>
                    </Col>
                    <Col>
                        <GenePicker
                            onChange={value => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    geneLocalId: value
                                })
                            )}
                            value={this.props.annotationData.data.geneLocalId}
                        />
                    </Col>
                </Row>
                <Row className="align-items-center mt-3">
                    <Col xs="3" className="text-right d-table-cell">
                        <Label className="align-center">
                            Comment
                        </Label>
                    </Col>
                    <Col>
                        <CustomTextArea name="comment"
                            onChange={event => this.props.onDataChange(
                                Object.assign({}, this.props.annotationData.data, {
                                    comment: event.target.value
                                })
                            )}
                            value={this.props.annotationData.data.comment}
                            placeholder="Type your comment..."
                            className="comment-text-area form-control"
                        >
                        </CustomTextArea>
                    </Col>
                </Row>
            </div>
        );
    }
}

Comment.propTypes = {
    annotationData: React.PropTypes.object,
    onDataChange: React.PropTypes.func
};

export default Comment;
