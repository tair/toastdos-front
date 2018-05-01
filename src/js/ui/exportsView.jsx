"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem} from 'reactstrap';
import config from '../../../config';

class ExportsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.renderExportList = this.renderExportList.bind(this);
    }

    componentDidMount() {
        this.props.loadExports();
    }

    renderExportItem(item, i) {
        return (
            <ListGroupItem tag="a" target="_blank" href={`${config.apiBase}/api/exports/files/${item}`} key={i} download>
                {item}
            </ListGroupItem>
        );
    }

    renderExportList() {
        return (
            <ListGroup className="list-group-flush">
                {this.props.exportsList.map(this.renderExportItem)}
            </ListGroup>
        );
    }

    renderLoading() {
        return (
            <div className="text-center py-3">
                <span className="fa fa-spin fa-refresh fa-3x" />
            </div>
        );
    }

    render() {
        return (
            <Container fluid className="mt-3">
                <Row className="justify-content-md-center">
                    <Col md="10">
                        <Card className="page-card">
                            <CardHeader>
                                <span className="fa fa-file" /> Exports
                            </CardHeader>
                            <CardBody className="p-0">
                                {this.props.loadingExportsList ? this.renderLoading():
                                    this.renderExportList()}
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <span /> File Types ReadMe
                            </CardHeader>
                            <CardBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        <p>
                                            Files named as <b>reviewedAnnotations.gaf</b> are <i>Gene Ontology (GO)</i> and <i>Plant Ontology (PO)</i> Annotations combined in a single file in GO GAF2.0 format <br />
                                            Full reference from GO site:<br />
                                            <a href="http://geneontology.org/page/go-annotation-file-format-20">http://geneontology.org/page/go-annotation-file-format-20</a><br /><br />
                                            <b>Column number</b>: content<br /><br />
                                            <b>1. Database</b>: Source Database of Annotated Object. One of UniProtKB or TAIR or RNACentral.<br />
                                            <b>2. Database Object Identifier</b> :the unique identifier for an object in the Database from column one.<br />
                                            <b>3. Database Object Symbol</b> : the symbolic name of the object (gene, protein, locus, RNA)  being annotated. Can be a gene product symbol or ORF name. Usually something with biological significance.<br />
                                            <b>4. Qualifier</b>: term that qualifies the relationship between the object and ontology term (e.g. NOT).<br />
                                            <b>5. Ontology ID</b>: the unique identifier for a GO or PO term<br />
                                            <b>6. Reference ID</b>: the unique identifier for the reference used for annotation. The format is source:identifier. Source is either  PubMed Database (e.g. PMID:23445566) or DOI (e.g. DOI:10.1073/pnas.1713574114)<br />
                                            <b>7. Evidence code</b>: three letter code corresponding to a GO evidence code (one of IDA, IGI, IPI, IMP, IEP).See <a href="http://www.geneontology.org/GO.evidence.html">http://www.geneontology.org/GO.evidence.html</a> for details on evidence codes.<br />
                                            <b>8. Evidence With</b>: Used for some annotations (IPI and IGI) that require supporting information about interacting component (for example a protein binding partner or a genetic supressor). Format is DBname:DBidentifier. More than one entity is allowed. When more than one entity is included a pipe (| )is used to indicate an OR relation, and a comma (,) is used to represent AND relation.<br />
                                            <b>9.  Aspect</b>: Refers to the namespace or ontology aspect. F=GO molecular function, C=GO cellular component, P=GO biological process, S=PO structure, G=PO growth and development stage<br />
                                            <b>10. Database Object Name</b>: name of the gene, gene product.<br />
                                            <b>11. Database Object Synonym</b>: Additional symbolic names for the gene product. Used to aid searching.<br />
                                            <b>12. Database object type</b>: A description of the object (from column 2) that is being annotated.  May be one of : gene_product, protein, RNA<br />
                                            <b>13. Taxon</b>: unique identifier corresponding to the taxon ID of the gene product being annotated (from column 2).<br />
                                            <b>14. Date</b>: Date on which the annotation was made; format is YYYMMDD.<br />
                                            <b>15. Annotator</b>: The ORCiD of the individual who make the annotation.<br />
                                            <b>16. Annotation Extension</b>: date the annotation was made.<br />
                                            <b>17. Gene Product Form ID</b>:
                                        </p>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <p>
                                            Files named as <b>otherAnnotations.json</b> are files containing gene name, comment annotations and associations to publications, in JSON format. At a minimum each set will have a gene-publication link, other values may be null.<br />
                                            Example:<br />
                                            &#123;<br />
                                            <b>“publication”</b>: "PMID:16891302",<br />
                                            <b>“locus”</b>: "Q08IT7",<br />
                                            <b>“source”</b>: "UniprotKB",<br />
                                            <b>“symbolicName”</b>: "GmICHG",<br />
                                            <b>“fullName”</b>: "SOYBEAN Isoflavone conjugate-specific beta-glucosidase",<br />
                                            <b>“comments”</b>: [ ]<br />
                                            &#125;<br />
                                            <b>publication:</b> either PubMed ID (PMID) or DOI<br />
                                            <b>locus</b>: one of UniProtKB id, AGI locus identifier, or RNACentral id<br />
                                            <b>source</b>: one of UniProtKB, TAIR, or RNACentral<br />
                                            <b>symbolicName</b>: may be null<br />
                                            <b>fullName</b>: may be null<br />
                                            <b>comments</b>: may be empty list
                                        </p>
                                    </ListGroupItem>
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ExportsView.propTypes = {
    loadExports: PropTypes.func,
    exportsList: PropTypes.arrayOf(PropTypes.string),
    loadingExportsList: PropTypes.bool,
};

ExportsView.defaultProps = {
    loadExports: () => {},
    exportsList: [],
    loadingExportsList: true
};

export default ExportsView;
