"use strict";

module.exports = (process.env.USE_MOCK_API ? require('./mock') : require('./real'));
