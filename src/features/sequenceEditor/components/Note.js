import classnames from 'classnames';
import first from 'lodash/fp/first';
import last from 'lodash/fp/last';
import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transition: 'transform 0.1s ease',
  },
  connector: {
    backgroundColor: transparentize(0.5, theme.palette.primary.main),
    height: 12,
    left: 20,
    position: 'absolute',
    top: 14,
    transformOrigin: 'left center',
    transition: 'transform 0.1s ease',
    width: 1,
    zIndex: 100,
  },
  fill: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
    height: 24,
    width: 24,
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
  point: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    height: 40,
    justifyContent: 'center',
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'all',
    position: 'absolute',
    top: 0,
    transition: 'transform 0.1s ease',
    width: 40,
    zIndex: 150,
  },
  selected: {
    zIndex: 300,
    '& $connector': {
      backgroundColor: theme.palette.secondary.main,
    },
    '& $fill': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: `0 0 10px ${transparentize(
        0.5,
        theme.palette.secondary.main,
      )}`,
    },
  },
});

function Note(props) {
  const {
    className,
    classes,
    isSelected,
    note,
    onDrag,
    onDragStart,
    onDragStop,
    onEndPointDrag,
    onEndPointDragStart,
    onEndPointDragStop,
    positionBounds,
    sizeBounds,
    ...rest
  } = props;

  const connectorStyle = React.useMemo(() => {
    const startPoint = first(note.points);
    const endPoint = last(note.points);
    const { asin, abs, PI, sign, sqrt } = Math;
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;
    const scale = x !== 0 ? sqrt(abs(x ** 2 + y ** 2)) : 0;
    const rotation = x !== 0 ? asin(abs(y / scale)) * (180 / PI) * sign(y) : 0;

    return {
      transform: `rotate(${rotation}deg) scaleX(${scale})`,
    };
  }, [note.points]);

  const endPointStyle = React.useMemo(() => {
    const startPoint = first(note.points);
    const endPoint = last(note.points);
    const x = (endPoint.x - startPoint.x) * 40;
    const y = (endPoint.y - startPoint.y) * 40;

    return {
      display: is32ndNote(note) ? 'none' : 'flex',
      transform: `translate(${x}px, ${y}px)`,
    };
  }, [note]);

  const handleDrag = React.useCallback(
    (e, { deltaX, deltaY }) => {
      onDrag({
        deltaX: Math.round(deltaX / 40),
        deltaY: Math.round(deltaY / 40),
      });
    },
    [onDrag],
  );

  const handleDragStart = React.useCallback(
    e => {
      onDragStart(note, e);
    },
    [note, onDragStart],
  );

  const handleEndPointDrag = React.useCallback(
    (e, { deltaX }) => {
      onEndPointDrag({
        deltaX: Math.round(deltaX / 40),
      });
    },
    [onEndPointDrag],
  );

  const handleEndPointDragStart = React.useCallback(
    e => {
      onEndPointDragStart(note, e);
    },
    [note, onEndPointDragStart],
  );

  return (
    <Draggable
      bounds={positionBounds}
      enableUserSelectHack={true}
      grid={[40, 40]}
      handle=".start-point"
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={onDragStop}
      position={{
        x: note.points[0].x * 40,
        y: note.points[0].y * 40,
      }}
    >
      <div
        className={classnames(
          classes.root,
          { [classes.selected]: isSelected },
          className,
        )}
        {...rest}
      >
        <div className={classnames(classes.point, 'start-point')}>
          <div className={classes.fill} />
        </div>
        <div className={classes.connector} style={connectorStyle} />
        <Draggable
          axis="x"
          bounds={sizeBounds}
          grid={[40, 40]}
          onDrag={handleEndPointDrag}
          onStart={handleEndPointDragStart}
          onStop={onEndPointDragStop}
          position={{
            x: (note.points[1].x - note.points[0].x) * 40,
            y: (note.points[1].y - note.points[0].y) * 40,
          }}
        >
          <div className={classes.point} style={endPointStyle}>
            <div className={classes.fill} />
          </div>
        </Draggable>
      </div>
    </Draggable>
  );
}

Note.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  isSelected: PropTypes.bool,
  note: PropTypes.object,
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  onEndPointDrag: PropTypes.func,
  onEndPointDragStart: PropTypes.func,
  onEndPointDragStop: PropTypes.func,
  positionBounds: PropTypes.object,
  sizeBounds: PropTypes.object,
};

export default withStyles(styles)(Note);

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
