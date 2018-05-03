"use strict";

import React from 'react';
import phoenixLogo from 'img/phoenixLogo.png';
import githubLogo from 'img/githubLogo.png';
import researchImg from 'img/research.png';
import submissionImg from 'img/submission.png';
import curationImg from 'img/curation.png';
import exportImg from 'img/export.png';

import { Container, Row, Col } from 'reactstrap';

class HomeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // set initial state
        };
    }

    render() {

        return (
            <div className="home">
                <Row className="banner-image">
                    <Col className="align-self-center">
                        <h3 className="goat-text text-light text-center align-self-center">&mdash; the &mdash;</h3>
                        <h1 className="goat-text text-light text-center align-self-center">
                            Generic Online Annotation Tool
                        </h1>
                        <h5 className="goat-text text-light text-center align-self-center">
                            Functional annotation of any gene from any plant from any paper
                        </h5>
                    </Col>
                </Row>
                <Container fluid className="main-page-descriptions">
                    <Row className="home-step" style={{backgroundColor:'#CFFCD9', overflow: "hidden"}}>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Publish</h1>
                                    <p className="home-step-text">
                                        GOAT is a tool for annotating gene function from published experimental data.  Start by adding the PubMed ID or DOI for the paper you wish to curate.
                                    </p>
                                </Col>
                                <Col className="home-step-img-col">
                                    <img src={researchImg} alt="research" />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className="home-step" style={{backgroundColor:'#95C1AC'}}>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Annotate</h1>
                                    <p className="home-step-text">
                                        Use the simple interface to annotate gene function(s) including Gene Ontology (GO) molecular function, GO biological role, GO subcellular localization, gene expression (using Plant Ontologies) and protein-protein physical interactions.  Add comments, gene names and symbols for any gene.
                                    </p>
                                </Col>
                                <Col className="home-step-img-col">
                                    <img src={submissionImg} alt="submission" />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className="home-step"style={{backgroundColor:'#72E08C'}}>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Submit</h1>
                                    <p className="home-step-text">
                                        Each submission is reviewed by an expert curator.
                                    </p>
                                </Col>
                                <Col className="home-step-img-col">
                                    <img src={curationImg} alt="curation" />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className="home-step" style={{backgroundColor:'#2EAA6E'}}>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Download</h1>
                                    <p className="home-step-text">
                                    Reviewed submissions are exported in standard exchange formats. Gene Ontology and Plant Ontology annotations are available in a GO Annotation Format (GAF2.0) file. Other comments are exported in JSON format.
                                    </p>
                                </Col>
                                <Col className="home-step-img-col">
                                    <img src={exportImg} alt="export" />
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className="py-5" style={{height:'150px', backgroundColor:'#899E8B'}}>
                        <Container>
                            <Row>
                                <Col>
                                    <a className="text-white"
                                            href="http://phoenixbioinformatics.org"
                                            target="_blank"
                                    >
                                        <img src={phoenixLogo}
                                            alt="phoenix bioinformatics logo"
                                            height='50px'
                                            style={{width:'auto'}}
                                        />
                                    </a>
                                </Col>
                                <Col className="text-right">
                                    <a
                                        className="text-white"
                                        href="https://github.com/tair"
                                        target="_blank"
                                    >
                                        <img src={githubLogo}
                                            alt="github-logo"
                                            height='50px'
                                            style={{width:'auto'}}
                                        />
                                    </a>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </div>
        );
    }
}


HomeView.propTypes = {

};

export default HomeView;

