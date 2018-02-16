"use strict";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ExportsView from 'ui/exportsView';
import {
   exportsList,
   loadingExportsList
  } from 'modules/exportsView/selectors';
import {
    requestExportsList
} from 'modules/exportsView/actions';

const ConnectedExportsView = connect(
    createStructuredSelector({
        exportsList,
        loadingExportsList
    }),
    dispatch => ({
        loadExports: () => dispatch(requestExportsList()),
    })
)(ExportsView);

export default ConnectedExportsView;
