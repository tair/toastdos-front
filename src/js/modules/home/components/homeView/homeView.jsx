"use strict";

import React from 'react';
import atImg from 'img/at.jpg';
import phoenixLogo from 'img/phoenixLogo.png';
import githubLogo from 'img/githubLogo.png';
import { Card, CardImg, CardText, CardHeader,
    CardBody, Button, Container, Row, Col } from 'reactstrap';

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
                <div className="main-page-descriptions">
                    <Row style={{height:'400px', backgroundColor:'#706C61'}}>
                        <Container>
                            <h1 className="text-white">Research</h1>
                        </Container>
                    </Row>
                    <Row style={{height:'400px', backgroundColor:'#B5DDA4'}}>
                        <Container>
                            <h1>Submission</h1>
                        </Container>
                    </Row>
                    <Row style={{height:'400px', backgroundColor:'#754668'}}>
                        <Container>
                            <h1>Curation</h1>
                        </Container>
                    </Row>
                    <Row style={{height:'400px', backgroundColor:'#899E8B'}}>
                        <Container>
                            <h1>Export</h1>
                        </Container>
                    </Row>
                    <Row className="py-5">
                        <Col className="panel-container text-center">
                                <img src={phoenixLogo}
                                    alt="phoenix bioinformatics logo"
                                    height='50px'
                                    style={{width:'auto'}}
                                />
                                <Button color='link'
                                    href="http://phoenixbioinformatics.org"
                                    target="_blank"
                                >
                                    Phoenix Bioinformatics
                                </Button>
                                <img src={githubLogo}
                                    alt="github-logo"
                                    height='50px'
                                    style={{width:'auto'}}
                                />
                                <Button
                                    color="link"
                                    href="https://github.com/tair"
                                    target="_blank"
                                >
                                    View Goat on GitHub
                                </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


HomeView.propTypes = {

};

export default HomeView;

