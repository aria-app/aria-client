import classnames from 'classnames';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    bottom: 0,
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  '@global': {
    '*': {
      margin: 0,
      outline: 'none !important',
      padding: 0,
      boxSizing: 'border-box',
      WebkitFocusRingColor: 'transparent !important',
      WebkitTapHighlightColor: 'transparent !important',
      WebkitTouchCallout: 'none !important',
      WebkitUserSelect: 'none !important',
      KhtmlUserSelect: 'none !important',
      MozUserSelect: 'none !important',
      MsUserSelect: 'none !important',
      userSelect: 'none !important',
    },
    'html, body': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
    },
    body: {
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
    },
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

Shell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

function Shell(props) {
  const { className, classes, ...rest } = props;

  return <div className={classnames(classes.root, className)} {...rest} />;
}

export default React.memo(withStyles(styles)(Shell));
