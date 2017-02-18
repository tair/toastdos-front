"use strict";

import Store from '../store';
import AuthenticationModule from 'modules/authentication';


export function isAuthenticated(nextState, replace) {
    let state = Store.getState();
    if(!AuthenticationModule.selectors.isAuthenticated(state)) {
        replace("/login");
    }
}

export function redirectIfLoggedIn(nextState, replace) {
    let state = Store.getState();
    if(AuthenticationModule.selectors.isAuthenticated(state)) {
        replace('/');
    }
}
