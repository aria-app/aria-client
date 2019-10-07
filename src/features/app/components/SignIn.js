"use strict";
exports.__esModule = true;
var firebase = require("firebase/app");
var getOr_1 = require("lodash/fp/getOr");
var Button_1 = require("@material-ui/core/Button");
var prop_types_1 = require("prop-types");
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var react_router_dom_1 = require("react-router-dom");
var withStyles_1 = require("@material-ui/styles/withStyles");
var shared_1 = require("../../shared");
var authProvider = shared_1["default"].constants.authProvider;
var styles = function () { return ({
    root: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center'
    }
}); };
function SignIn(props) {
    var classes = props.classes, isAuthenticated = props.isAuthenticated, location = props.location;
    var redirectFrom = react_1["default"].useMemo(function () { return getOr_1["default"]({ pathname: '/' }, 'state.from', location); }, [location]);
    react_1["default"].useEffect(function () {
        window.document.title = 'Sign In - Aria';
    }, []);
    if (isAuthenticated) {
        return <react_router_dom_1.Redirect to={redirectFrom}/>;
    }
    return (<react_i18next_1.Translation>
      {function (t) { return (<div className={classes.root}>
          <Button_1["default"] onClick={function () { return firebase.auth().signInWithRedirect(authProvider); }} variant="contained">
            {t('Sign in with Google')}
          </Button_1["default"]>
        </div>); }}
    </react_i18next_1.Translation>);
}
SignIn.propTypes = {
    isAuthenticated: prop_types_1["default"].bool
};
exports["default"] = react_1["default"].memo(withStyles_1["default"](styles)(SignIn));
