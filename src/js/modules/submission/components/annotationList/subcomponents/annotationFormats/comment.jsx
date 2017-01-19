"use strict";

import React from 'react';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <textarea name="comment">
                </textarea>
            </div>
        );
    }
}

export default Comment;
