/* eslint-disable no-undef */
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`<body><div id="app"></div></body>`, {
  url: 'http://localhost/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.history = jsdom.window.history;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
