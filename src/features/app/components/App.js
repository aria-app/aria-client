"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var dawww_1 = require("dawww");
var prop_types_1 = require("prop-types");
var react_1 = require("react");
var react_hotkeys_1 = require("react-hotkeys");
var react_render_helpers_1 = require("react-render-helpers");
var react_router_dom_1 = require("react-router-dom");
var ThemeProvider_1 = require("@material-ui/styles/ThemeProvider");
var tone_1 = require("tone");
var dashboard_1 = require("../../dashboard");
var shared_1 = require("../../shared");
var songEditor_1 = require("../../songEditor");
var SignInContainer_1 = require("./SignInContainer");
var SignOutContainer_1 = require("./SignOutContainer");
var DashboardContainer = dashboard_1["default"].components.DashboardContainer;
var _a = shared_1["default"].components, LoadingIndicator = _a.LoadingIndicator, Shell = _a.Shell;
var STARTED = dawww_1["default"].PLAYBACK_STATES.STARTED;
var SongEditorContainer = songEditor_1["default"].components.SongEditorContainer;
var PrivateRoute = function (_a) {
    var Component = _a.component, isAuthenticated = _a.isAuthenticated, location = _a.location, rest = __rest(_a, ["component", "isAuthenticated", "location"]);
    return (<react_router_dom_1.Route {...rest} render={function (props) {
        return isAuthenticated ? (<Component {...props}/>) : (<react_router_dom_1.Redirect to={{
            pathname: '/sign-in',
            state: { from: location }
        }}/>);
    }}/>);
};
function App(props) {
    var didAuthenticationRun = props.didAuthenticationRun, isAuthenticated = props.isAuthenticated, onPause = props.onPause, onPlay = props.onPlay, onStop = props.onStop, playbackState = props.playbackState;
    var playPause = react_1["default"].useCallback(function playPause() {
        if (tone_1["default"].context.state !== 'running') {
            tone_1["default"].context.resume();
        }
        if (playbackState === STARTED) {
            onPause();
        }
        else {
            onPlay();
        }
    }, [onPause, onPlay, playbackState]);
    return (<ThemeProvider_1["default"] theme={shared_1["default"].theme}>
      <react_hotkeys_1.GlobalHotKeys allowChanges={true} handlers={{ PLAY_PAUSE: playPause, STOP: onStop }} keyMap={{ PLAY_PAUSE: 'enter', STOP: 'esc' }}/>
      <Shell>
        {react_render_helpers_1.hideIf(didAuthenticationRun)(<LoadingIndicator>AUTHENTICATING...</LoadingIndicator>)}
        {react_render_helpers_1.showIf(didAuthenticationRun)(<react_1["default"].Fragment>
            <react_router_dom_1.Route component={SignInContainer_1["default"]} exact={true} path="/sign-in"/>
            <react_router_dom_1.Route component={SignOutContainer_1["default"]} exact={true} path="/sign-out"/>
            <PrivateRoute component={DashboardContainer} exact={true} isAuthenticated={isAuthenticated} path="/"/>
            <PrivateRoute component={SongEditorContainer} exact={false} isAuthenticated={isAuthenticated} path="/song/:songId"/>
          </react_1["default"].Fragment>)}
      </Shell>
    </ThemeProvider_1["default"]>);
}
App.propTypes = {
    isAuthenticated: prop_types_1["default"].bool,
    didAuthenticationRun: prop_types_1["default"].bool,
    onPause: prop_types_1["default"].func,
    onPlay: prop_types_1["default"].func,
    onStop: prop_types_1["default"].func,
    playbackState: prop_types_1["default"].string
};
exports["default"] = react_1["default"].memo(App);
