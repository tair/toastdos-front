"use strict";
/**
 * Root entry file
 *
 * This file instantiates the root React component and
 * mounts it to the DOM
 */

// import styles
import 'normalize.css';
import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store from './js/store';
import App from './js/app';

/**
 * Main application entry point
 */

let app_props = {
	// set app props
};

ReactDOM.render(
    React.createElement(
        Provider,
        {store: Store},
        React.createElement(App, app_props)
    ), 
	document.getElementById('app-container')
);

