"use strict";

module.exports = (process.env.MOCK_API ? require('./mock') : require('./real'));
