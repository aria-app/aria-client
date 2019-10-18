import classnames from 'classnames';
import first from 'lodash/fp/first';
import last from 'lodash/fp/last';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import Draggable, {
  DraggableBounds,
  DraggableEventHandler,
} from 'react-draggable';
import { Note as INote, Point } from '../../shared/types';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      transition: 'transform 0.1s ease',
    },
    connector: {
      backgroundColor: theme.palette.primary.light,
      height: 10,
      left: 20,
      position: 'absolute',
      top: 15,
      transformOrigin: 'left center',
      transition: 'transform 0.1s ease',
      width: 1,
      zIndex: 100,
    },
    fill: {
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.shape.borderRadius,
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
        backgroundColor: theme.palette.primary.main,
      },
      '& $fill': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  });

export interface NoteProps extends WithStyles<typeof styles> {
  className?: string;
  isSelected?: boolean;
  note?: INote;
  onDrag?: (delta: Point) => void;
  onDragStart?: (
    note: INote,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onDragStop?: DraggableEventHandler;
  onEndPointDrag?: (delta: Partial<Point>) => void;
  onEndPointDragStart?: (
    note: INote,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onEndPointDragStop?: DraggableEventHandler;
  positionBounds?: DraggableBounds;
  sizeBounds?: DraggableBounds;
}

function Note(props: NoteProps) {
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
      onDrag({ x: Math.round(deltaX / 40), y: Math.round(deltaY / 40) });
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
      onEndPointDrag({ x: Math.round(deltaX / 40) });
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

export default React.memo(withStyles(styles)(Note));

function is32ndNote(note) {
  const length = last(note.points).x - first(note.points).x;
  return length === 0;
}
