"use strict";

import React from 'react';

import GenePicker from '../genePicker';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <div>
                    <h5>Gene</h5>
                    <GenePicker />
                </div>
                <div>
                    <h5>Comment</h5>
                    <textarea name="comment">
                    </textarea>
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    annotationData: React.PropTypes.object
};

export default Comment;
