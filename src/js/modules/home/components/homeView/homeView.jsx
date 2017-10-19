"use strict";

import React from 'react';
import atImg from 'img/at.jpg';
import phoenixLogo from 'img/phoenixLogo.png';
import githubLogo from 'img/githubLogo.png';
import {Card, CardImg, CardText, CardHeader,
    CardBody, CardTitle, CardSubtitle, Button,
    Container, Row, Col} from 'reactstrap';

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // set initial state
        };
    }

    render() {

        const bannerStyle = {
            backgroundImage: `url(${atImg})`,
        };

        return (
            <div className="home">
                <Row className="banner-image" style={bannerStyle}>
                    <Col className="align-self-center">
                        <h3 className="goat-text text-light text-center align-self-center">&mdash; the &mdash;</h3>
                        <h1 className="goat-text text-light text-center align-self-center">
                            Genetic Online Annotation Tool
                        </h1>
                    </Col>
                </Row>
                <br/>
                <Container>
                    <Row>
                        <Col className="panel-container">
                            <Card className="text-center bg-light">
                                <CardHeader className="bg-light">
                                    <CardImg top src={phoenixLogo}
                                        alt="phoenix bioinformatics logo"
                                        height='120px'
                                        style={{width:'auto'}}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <CardText>
                                        GOAT is a service from Phoenix Bioinformatics.
                                        Visit our website to learn more about us.
                                    </CardText>
                                    <Button color='success'
                                        href="http://phoenixbioinformatics.org"
                                        target="_blank"
                                    >
                                        Visit Us
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="text-center bg-light">
                                <CardHeader className="bg-light">
                                    <CardImg top src={githubLogo}
                                        alt="github-logo"
                                        height='120px'
                                        style={{width:'auto'}}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <CardText>
                                        GOAT is open source! Contribute to this and other Tair projects on our GitHub page!
                                    </CardText>
                                    <Button
                                        color="success"
                                        href="https://github.com/tair"
                                        target="_blank"
                                    >
                                        Check Out Our GitHub
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>  
        );
    }
}


HomeView.propTypes = {
    
};

export default HomeView;

