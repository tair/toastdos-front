"use strict";

import * as api from 'lib/api';
import * as actions from './actionTypes';
import AuthModule from 'modules/authentication';

const roleObjects = {
    "Admin": {id: 1, name: "Admin"},
    "Researcher": {id: 2, name: "Researcher"},
    "Curator": {id: 3, name: "Curator"}
};

function failUsersList(error) {
    return {
        type: actions.FAIL_USERS_LIST,
        error,
    };
}

function successUsersList(data) {
    return {
        type: actions.SUCCESS_USERS_LIST,
        data,
    };
}

export function requestUsersList() {
    return (dispatch, getState) => {

        dispatch({
            type: actions.REQUEST_USERS_LIST,
        });

        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        return api.listUsers(token, (err, data) => {
            if (err) {
                return dispatch(failUsersList(err));
            }
            return dispatch(successUsersList(data));
        });
    };
}

export function addRole(user, roleName) {
    return (dispatch, getState) => {

        const role = roleObjects[roleName];

        dispatch({
            type: actions.ADD_USER_ROLE,
            user,
            role
        });

        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        api.addRole(user, role.id, token, (err) => {
            if (err) {
                // TODO better error reporting.
                alert("Could not update role: " + JSON.stringify(err));
            }
        });
    };
}

export function removeRole(user, roleName) {
    return (dispatch, getState) => {

        const role = roleObjects[roleName];

        dispatch({
            type: actions.REMOVE_USER_ROLE,
            user,
            role
        });

        const currState = getState();
        const token = AuthModule.selectors.rawJwtSelector(currState);

        api.removeRole(user, role.id, token, (err) => {
            if (err) {
                // TODO better error reporting.
                alert("Could not update role: " + JSON.stringify(err));
            }
        });
    };
}
