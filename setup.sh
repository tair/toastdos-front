#!/bin/bash
npm install && \
node ./scripts/generateOrcidFile.js && \
echo "Setup complete, you must update config files."
