import classnames from 'classnames';
import { includes } from 'lodash/fp';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    '&::after': {
      backgroundColor: theme.palette.primary.main,
      bottom: 0,
      boxShadow: `2px 0 5px ${theme.palette.primary.main}`,
      content: "''",
      display: 'block',
      right: -2,
      opacity: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: 2,
    },
  },
  label: {
    display: 'none',
  },
  c: {
    '& $label': {
      display: 'block',
    },
  },
  hoveredRow: {
    '&::after': {
      opacity: 1,
    },
  },
  sharp: {
    backgroundColor: theme.palette.text.primary,
  },
});

function Key(props) {
  const { className, classes, isHoveredRow, onMouseDown, step, style } = props;

  const handleMouseDown = React.useCallback(() => onMouseDown(step), [
    onMouseDown,
    step,
  ]);

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.c]: includes('C', step.name) && !includes('#', step.name),
          [classes.hoveredRow]: isHoveredRow,
          [classes.sharp]: includes('#', step.name),
        },
        className,
      )}
      onMouseDown={handleMouseDown}
      style={style}
    >
      <div className={classes.label} step={step}>
        {step.name}
      </div>
    </div>
  );
}

Key.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  isHoveredRow: PropTypes.bool,
  onMouseDown: PropTypes.func,
  step: PropTypes.object,
  style: PropTypes.object,
};

export default React.memo(withStyles(styles)(Key));
