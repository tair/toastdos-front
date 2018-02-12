"use strict";

import React from 'react';
import { Badge } from 'reactstrap';

class ExternalIdBadge extends React.Component {

    constructor(props) {
        super(props);

        this.externalId = this.props.externalId;
    }

    generateExternalIdLink(externalId) {
        let link = <span>{externalId}</span>;
        let baseUrl = '';
        if (externalId.indexOf("GO:") !== -1) {
            let goBaseUrl = 'http://amigo.geneontology.org/amigo/term/';
            link = (
                <a href={`${goBaseUrl}${externalId}#display-lineage-tab`}
                    className="text-light"
                    target="_blank"
                >
                    {externalId} <span className="fa fa-external-link"></span>
                </a>
            );
        } else if (externalId.indexOf("PO:") !== -1) {
            let poBaseUrl = 'http://browser.planteome.org/amigo/term/';
            link = (
                <a href={`${poBaseUrl}${externalId}`}
                    className="text-light"
                    target="_blank"
                >
                    {externalId} <span className="fa fa-external-link"></span>
                </a>
            );
        } else if (externalId.indexOf("ECO:") !== -1) {
            let ecoBaseUrl = 'http://www.evidenceontology.org/browse/';
            link = (
                <a href={`${ecoBaseUrl}#${externalId}`}
                    className="text-light"
                    target="_blank"
                >
                    {externalId} <span className="fa fa-external-link"></span>
                </a>
            );
        }
        return link;
    }

    render() {
        return (
            this.externalId !== "" ?
            <Badge color="success">
                {this.generateExternalIdLink(this.externalId)}
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
