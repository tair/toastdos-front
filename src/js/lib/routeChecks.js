"use strict";

import Store from '../store';

export function isAuthenticated(nextState, replace) {
    let state = Store.getState();
    if(!state.authentication.isAuthenticated) {
        replace("/login");
    }
}

export function redirectIfLoggedIn(nextState, replace) {
    let state = Store.getState();
    
    if(state.authentication.isAuthenticated) {
        replace('/');
    }
}
