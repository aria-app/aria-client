import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import round from 'lodash/round';
import times from 'lodash/fp/times';
import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const getStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.action.hover}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    height: 36,
    marginBottom: theme.spacing(3),
    position: 'relative',
    transition: 'width 200ms ease',
  },
  measure: {
    alignItems: 'flex-end',
    bottom: 0,
    display: 'flex',
    left: 0,
    paddingBottom: theme.spacing(0.25),
    paddingLeft: theme.spacing(0.75),
    position: 'absolute',
    top: 0,
    '&:not(:first-child)': {
      borderLeft: `2px solid ${theme.palette.action.hover}`,
    },
  },
  measureNumber: {
    color: transparentize(0.5, theme.palette.text.primary),
    fontSize: 10,
    fontWeight: 'bold',
  },
  resizer: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'col-resize',
    height: 34,
    left: 0,
    position: 'absolute',
    top: -1,
    transition: 'border-color 200ms ease, transition 200ms ease',
    width: 24,
    '&:hover': {
      borderColor: theme.palette.text.secondary,
    },
    '&::after': {
      borderLeft: `2px dotted ${theme.palette.text.hint}`,
      borderRight: `2px dotted ${theme.palette.text.hint}`,
      content: "''",
      display: 'block',
      height: 10,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 4,
    },
  },
  resizerDraggableWrapper: {
    position: 'absolute',
  },
  resizing: {
    cursor: 'col-resize',
    transition: 'none',
    zIndex: 200,
    '& $resizer': {
      transition: 'none',
    },
  },
});

function Ruler(props) {
  const {
    classes,
    measureCount,
    measureWidth,
    onMeasureCountChange,
    onPositionSet,
  } = props;
  const [isResizing, setIsResizing] = React.useState(false);
  const [length, setLength] = React.useState(measureCount);

  const handleClick = React.useCallback(
    e => {
      const measures = e.nativeEvent.offsetX / measureWidth;
      const notesPerMeasure = 32;

      onPositionSet(round(measures * notesPerMeasure));
    },
    [measureWidth, onPositionSet],
  );

  const handleResizerDragStart = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizerDrag = React.useCallback(
    (e, dragData) => {
      setLength(Math.max(1, (dragData.lastX - 16) / measureWidth));
    },
    [measureWidth],
  );

  const handleResizerDragStop = React.useCallback(() => {
    const roundedLength = Math.max(1, Math.round(length));

    setIsResizing(false);

    onMeasureCountChange(roundedLength);

    setLength(roundedLength);
  }, [length, onMeasureCountChange]);

  return (
    <div
      className={classnames(classes.root, {
        [classes.resizing]: isResizing,
      })}
      onClick={handleClick}
      style={{ width: measureWidth * length + 4 }}
    >
      <AnimatePresence>
        {times(
          i => (
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              className={classes.measure}
              key={i}
              style={{ transform: `translateX(${i * 64}px)` }}
              transition={{ duration: 0.1 }}
            >
              <div className={classes.measureNumber}>{i + 1}</div>
            </motion.div>
          ),
          Math.round(length),
        )}
      </AnimatePresence>
      <Draggable
        axis="x"
        bounds={{ left: 64 - 16 }}
        onDrag={handleResizerDrag}
        onStart={handleResizerDragStart}
        onStop={handleResizerDragStop}
        position={{ x: length * 64 + 16, y: 0 }}
      >
        <div className={classes.resizerDraggableWrapper}>
          <div className={classes.resizer} />
        </div>
      </Draggable>
    </div>
  );
}

Ruler.propTypes = {
  classes: PropTypes.object,
  measureCount: PropTypes.number,
  measureWidth: PropTypes.number,
  onMeasureCountChange: PropTypes.func,
  onPositionSet: PropTypes.func,
};

export default React.memo(withStyles(getStyles)(Ruler));
