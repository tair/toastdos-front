"use strict";


/**
 * DOI - Digital Object Identifier
 *
 * 10.1594/GFZ.GEOFON.gfz2009kciu
 */
const DOI_VALIDATOR = /^(10\.\d{4,9}\/.+)$/;

/**
 * Pubmed ID
 *
 * 123456789
 */
const PUBMED_VALIDATOR = /^(\d+)$/;


function isDOI(val) {
    let text = '' + val;
    return !!text.match(DOI_VALIDATOR);
}

function isPubmedId(val) {
    let text = '' + val;
    return !!text.match(PUBMED_VALIDATOR);
}

module.exports = {
    isDOI,
    isPubmedId
};
