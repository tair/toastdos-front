"use strict";

import React from 'react';
import atImg from 'img/at.jpg';
import phoenixLogo from 'img/phoenixLogo.png';
import githubLogo from 'img/githubLogo.png';

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
                <div className="row banner-image" style={bannerStyle}>
                    <div className="col align-self-center">
                        <h3 className="goat-text text-light text-center align-self-center">&mdash; the &mdash;</h3>
                        <h1 className="goat-text text-light text-center align-self-center">
                            Genetic Online Annotation Tool
                        </h1>
                    </div>
                </div>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="panel-container col-sm">
                            <div className="card text-center bg-light">
                                <div classname="card-header">
                                    <img className="img-card-top"
                                        src={phoenixLogo}
                                        alt="phoenix bioinformatics logo"
                                        style={{height: '100px'}}
                                    />
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        GOAT is a service from Phoenix Bioinformatics.
                                        Visit our website to learn more about us.
                                    </p>
                                    <a
                                        className="btn btn-success"
                                        href="http://phoenixbioinformatics.org"
                                        target="_blank"
                                    >
                                        Visit Us
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="panel-container col-sm">
                            <div className="card text-center bg-light">
                                <div classname="card-header">
                                    <img className="img-card-top"
                                        src={githubLogo}
                                        alt="github-logo"
                                        style={{height: '100px'}}
                                    />
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        GOAT is open source! Contribute to this and other Tair projects on our GitHub page!
                                    </p>
                                    <a
                                        className="btn btn-success"
                                        href="https://github.com/tair"
                                        target="_blank"
                                    >
                                        Check Out Our GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}


HomeView.propTypes = {
    
};

export default HomeView;

