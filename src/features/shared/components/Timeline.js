import classnames from 'classnames';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.text.primary,
    bottom: 0,
    left: 0,
    opacity: 0.25,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: 2,
  },
});

Timeline.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  offset: PropTypes.number,
  style: PropTypes.object,
};

Timeline.defaultProps = { style: {} };

function Timeline(props) {
  const { className, classes, isVisible, offset, style, ...rest } = props;

  if (!isVisible) return null;

  return (
    <div
      className={classnames(classes.root, className)}
      style={{ ...style, transform: `translateX(${offset}px)` }}
      {...rest}
    />
  );
}

export default React.memo(withStyles(styles)(Timeline));
