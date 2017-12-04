"use strict";

import React from 'react';
import { Badge } from 'reactstrap';

class ExternalIdBadge extends React.Component {

    constructor(props) {
        super(props);

        this.externalId = this.props.externalId;
    }

    render() {
        return (
            this.externalId !== "" ?
            <Badge color="success">
            { this.externalId.indexOf("GO:") !== -1 ?
                <a href={`http://amigo.geneontology.org/amigo/term/${this.externalId}#display-lineage-tab`}
                    className="text-light"
                    target="_blank"
                >
                    {this.externalId} <span className="fa fa-external-link"></span>
                </a>
                : <span>{this.externalId}</span>
            }
            </Badge>
            :
            <Badge color="warning">
                <span>No existing ID</span>
            </Badge>
        );
    }
}

ExternalIdBadge.propTypes = {
    externalId: React.PropTypes.string,
};

ExternalIdBadge.defaultProps = {
    externalId: '',
};

export default ExternalIdBadge;
