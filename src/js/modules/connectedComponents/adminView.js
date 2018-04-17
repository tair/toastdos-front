"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AdminView from 'ui/adminView';
import {
   usersList,
   loadingUsersList
  } from 'modules/adminView/selectors';
import {
    requestUsersList,
    addRole,
    removeRole
} from 'modules/adminView/actions';

const ConnectedAdminView = connect(
    createStructuredSelector({
        usersList,
        loadingUsersList
    }),
    dispatch => ({
        loadUsers: () => dispatch(requestUsersList()),
        addRole: (user, roleName) => dispatch(addRole(user, roleName)),
        removeRole: (user, roleName) => dispatch(removeRole(user, roleName)),
    })
)(AdminView);

export default ConnectedAdminView;
