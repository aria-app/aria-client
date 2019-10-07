"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
var user_1 = require("../../user");
var SignOut_1 = require("./SignOut");
exports["default"] = react_redux_1.connect(function (state) { return ({
    isAuthenticated: user_1["default"].selectors.getIsAuthenticated(state)
}); })(SignOut_1["default"]);
