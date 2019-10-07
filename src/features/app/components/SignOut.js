"use strict";
exports.__esModule = true;
var firebase = require("firebase/app");
var prop_types_1 = require("prop-types");
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var react_router_dom_1 = require("react-router-dom");
var withStyles_1 = require("@material-ui/styles/withStyles");
var styles = function () { return ({
    root: {
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center',
        textTransform: 'uppercase'
    }
}); };
function SignOut(props) {
    var classes = props.classes, isAuthenticated = props.isAuthenticated;
    react_1["default"].useEffect(function () {
        window.document.title = 'Sign Out - Aria';
        setTimeout(function () {
            // TODO: Convert to auth helper
            firebase.auth().signOut();
        }, 1000);
    }, []);
    if (!isAuthenticated) {
        return <react_router_dom_1.Redirect to={{ pathname: '/sign-in' }}/>;
    }
    return (<react_i18next_1.Translation>
      {function (t) { return <div className={classes.root}>{t('Signing Out')}</div>; }}
    </react_i18next_1.Translation>);
}
SignOut.propTypes = {
    isAuthenticated: prop_types_1["default"].bool
};
exports["default"] = react_1["default"].memo(withStyles_1["default"](styles)(SignOut));
