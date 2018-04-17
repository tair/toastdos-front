"use strict";

import * as actions from './actionTypes';

const defaultState = {
    loadingUsersList: false,
    usersListLoadError: null,
    usersList: []
};


export default function (state = defaultState, action) {
    let newUsersList;
    switch (action.type) {
    case actions.REQUEST_USERS_LIST:
        return Object.assign({}, state, {
            loadingUsersList: true,
            usersListLoadError: null,
        });
    case actions.SUCCESS_USERS_LIST:
        return Object.assign({}, state, {
            loadingUsersList: false,
            usersList: action.data,
        });
    case actions.FAIL_USERS_LIST:
        return Object.assign({}, state, {
            loadingUsersList: false,
            usersListLoadError: action.error,
        });
    case actions.ADD_USER_ROLE:
        newUsersList = state.usersList.map(user => {
            if (user.id == action.user) {
                let newRoles = user.roles.slice(0);
                newRoles.push(action.role);
                return Object.assign({}, user, {
                    roles: newRoles
                });
            } else {
                return Object.assign({}, user);
            }
        });
        return {
            ...state,
            usersList: newUsersList
        };
    case actions.REMOVE_USER_ROLE:
        newUsersList = state.usersList.map(user => {
            if (user.id == action.user) {
                let newRoles = user.roles.slice(0);
                newRoles = newRoles.filter(role => role.id != action.role.id);
                return Object.assign({}, user, {
                    roles: newRoles
                });
            } else {
                return Object.assign({}, user);
            }
        });
        return {
            ...state,
            usersList: newUsersList
        };
    default:
        return state;
    }
}
