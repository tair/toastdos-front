"use strict";

import React from 'react';
import PropTypes from 'prop-types';

class UserOrcidLink extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a target="_blank" href={`https://orcid.org/${this.props.user.orcid_id}`}>{this.props.user.name} <span className="fa fa-external-link" /></a>
        );
    }
}

UserOrcidLink.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        orcid_id: PropTypes.string
    }).isRequired
};

UserOrcidLink.defaultProps = {
    user: {
        name: '...',
        orcid_id: '',
    }
};

export default UserOrcidLink;
