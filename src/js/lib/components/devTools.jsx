"use strict";

import React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import SliderMonitor from 'redux-slider-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';

const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
        changeMonitorKey='ctrl-m'
        defaultIsVisible={false}
        defaultPosition="bottom"
    >
        <LogMonitor/>
        <DiffMonitor />
        <SliderMonitor keyboardEnabled />
    </DockMonitor>
);

export default DevTools;
