"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var audio_1 = require("../../audio");
var user_1 = require("../../user");
var shared_1 = require("../../shared");
var App_1 = require("./App");
exports["default"] = react_router_dom_1.withRouter(react_redux_1.connect(function (state) { return ({
    isAuthenticated: user_1["default"].selectors.getIsAuthenticated(state),
    didAuthenticationRun: user_1["default"].selectors.getDidAuthenticationRun(state),
    playbackState: audio_1["default"].selectors.getPlaybackState(state)
}); }, {
    onPause: shared_1["default"].actions.playbackPauseRequestStarted,
    onPlay: shared_1["default"].actions.playbackStartRequestStarted,
    onStop: shared_1["default"].actions.playbackStopRequestStarted
})(App_1["default"]));
