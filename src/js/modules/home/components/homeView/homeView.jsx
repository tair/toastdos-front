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
                            Submit gene annotations, protein interactions, and more for all organisms.
                        </h5>
                    </Col>
                </Row>
                <Container fluid className="main-page-descriptions">
                    <Row className="home-step" style={{backgroundColor:'#CFFCD9', overflow: "hidden"}}>
                        <Container>
                            <Row>
                                <Col>
                                    <h1>Research</h1>
                                    <p className="home-step-text">
                                        A research paper is published with new biological insights. The researcher wants to extract the meaningful relations and knowledge into a common format.
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
                                    <h1>Submission</h1>
                                    <p className="home-step-text">
                                    They create a new submission, which consists of a publication id, gene names, and annotations describing gene relations and protein interactions.
                                    <br />
                                    Every piece of data is verified against an array of external biological databases.
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
                                    <h1>Curation</h1>
                                    <p className="home-step-text">
                                    Curators review the submission and correct any mistakes found, approving or denying annotations individually.
                                    <br />
                                    The submission is finalized and added to the database once all annotations have been reviewed.
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
                                    <h1>Export</h1>
                                    <p className="home-step-text">
                                    All accepted data is compiled into a tab-separated export format accepted by major genetic databases. Comments are also exported in a separate JSON file.
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

