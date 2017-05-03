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
                <div className="banner-image" style={bannerStyle}>
                </div>
                <div className="info-panel-group">
                    <div className="panel-container">
                        <div className="panel">
                            <div className="panel-content">
                                <img
                                    src={phoenixLogo}
                                    alt="phoeniz bioinformatics logo"
                                    style={{height: '118px'}}
                                />
                                <p>
                                    ToastDos is a service from Phoenix Bioinformatics.
                                    Visit our website to learn more about us.
                                    <br/>
                                </p>
                                <a
                                    className="btn btn-primary"
                                    href="http://phoenixbioinformatics.org"
                                    target="_blank"
                                >
                                    Visit Us
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="panel-container">
                        <div className="panel github">
                            <div className="panel-content">
                                <img
                                    src={githubLogo}
                                    alt="github-logo"
                                    style={{height: '100px'}}
                                />
                                <p>
                                    ToastDos is open source! Contribute to this and other Tair projects on our GitHub page!
                                </p>
                                <a
                                    className="btn btn-primary"
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
        );
    }
}


HomeView.propTypes = {
    
};

export default HomeView;

