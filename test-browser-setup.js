global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.localStorage = window.localStorage;
global.navigator = window.navigator;
