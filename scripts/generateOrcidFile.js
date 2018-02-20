#!/usr/bin/env node
"use strict";

if(!process.env.RESOURCEROOT) {
	console.error('No environment variable RESOURCEROOT found.');
	process.exit(1);
}

const DESTINATION_DIR = process.env.RESOURCEROOT;
const FILENAME = "orcid_public_info.json";

const jsonfile  = require('jsonfile');
const fs        = require('fs');
const path      = require('path');

let jsonStructure = {
    authUrl: "http://orcidAuthUrl.com"
}

jsonfile.writeFileSync(path.join(DESTINATION_DIR, FILENAME), jsonStructure, {spaces: 2});

