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
});

Shell.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

function Shell(props) {
  const { className, classes, ...rest } = props;

  return <div className={classnames(classes.root, className)} {...rest} />;
}

export default withStyles(styles)(Shell);
