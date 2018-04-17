"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

class ExternalIdBadge extends React.Component {

    constructor(props) {
        super(props);

        this.externalId = this.props.externalId;
    }

    // generate href url for the given externalId
    generateExternalIdLink(externalId) {
        let href = '';
        // GO external id
        if (externalId.indexOf("GO:") !== -1) {
            let goBaseUrl = 'http://amigo.geneontology.org/amigo/term/';
            href = `${goBaseUrl}${externalId}#display-lineage-tab`;

        // PO external id
        } else if (externalId.indexOf("PO:") !== -1) {
            let poBaseUrl = 'http://browser.planteome.org/amigo/term/';
            href = `${poBaseUrl}${externalId}`;

        // ECO external id
        } else if (externalId.indexOf("ECO:") !== -1) {
            let ecoBaseUrl = 'http://www.evidenceontology.org/browse/';
            href = `${ecoBaseUrl}#${externalId}`;
        }

        return href;
    }

    // generate the html element for the given externalId
    generateIdElement(externalId){
        let href = this.generateExternalIdLink(externalId);
        if (href !== "") {
            return (
                <a href={href} className="text-light" target="_blank">
                    {externalId} <span className="fa fa-external-link"></span>
                </a>
            );
        } else {
            return <span>{externalId}</span>;
        }
    }

    render() {
        return (
            this.externalId !== "" ?
            <Badge color="success">
                {this.generateIdElement(this.externalId)}
            </Badge>
            :
            <Badge color="warning">
                <span>No existing ID</span>
            </Badge>
        );
    }
}

ExternalIdBadge.propTypes = {
    externalId: PropTypes.string,
};

ExternalIdBadge.defaultProps = {
    externalId: '',
};

export default ExternalIdBadge;
