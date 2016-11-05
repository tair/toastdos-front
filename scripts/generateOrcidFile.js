#!/usr/bin/env node
"use strict";

const DESTINATION_DIR = "./resources"
const FILENAME = "orcid_app_info.json";

const jsonfile  = require('jsonfile');
const fs        = require('fs');
const path      = require('path');

let jsonStructure = {
    authUrl: "http://orcidAuthUrl.com"
}

jsonfile.writeFileSync(path.join(DESTINATION_DIR, FILENAME), jsonStructure, {spaces: 2});

