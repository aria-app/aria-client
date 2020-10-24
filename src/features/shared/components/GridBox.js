import withStyles from '@material-ui/styles/withStyles';
import classnames from 'classnames';
import clamp from 'lodash/fp/clamp';
import React from 'react';
import Draggable from 'react-draggable';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'transform 200ms ease, width 200ms ease',
    zIndex: 100,
  },
  resizer: {
    backgroundColor: 'transparent',
    bottom: '0',
    cursor: 'col-resize',
    left: '0',
    position: 'absolute',
    top: '0',
    width: theme.spacing(2),
    zIndex: 2,
  },
  dragging: {
    cursor: 'move',
    transition: 'none',
    zIndex: 200,
    '& $resizer': {
      cursor: 'move',
    },
  },
  resizing: {
    cursor: 'col-resize',
    transition: 'none',
    zIndex: 200,
  },
});

// export interface BoxProps extends WithStyles<typeof styles> {
//   contentComponent?: React.ElementType;
//   item?: BoxItem;
//   onItemChange?: (item?: BoxItem) => void;
//   step?: number;
//   style?: React.CSSProperties;
//   totalLength?: number;
// }

function Box(props) {
  const {
    classes,
    contentComponent: ContentComponent = () => null,
    item,
    onItemChange,
    step = 100,
    style = {},
    totalLength,
  } = props;
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [length, setLength] = React.useState(item.length);

  const handleDragStart = React.useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = React.useCallback(
    (e, dragData) => {
      setIsDragging(false);

      onItemChange({
        ...item,
        x: Math.round(dragData.lastX / 64),
      });
    },
    [item, onItemChange],
  );

  const handleResizerDrag = React.useCallback(
    (e, dragData) => {
      setLength(clamp(1, totalLength - item.x, dragData.lastX / step));
    },
    [item.x, step, totalLength],
  );

  const handleResizerDragStart = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizerDragStop = React.useCallback(() => {
    const roundedLength = Math.max(1, Math.round(length));

    setIsResizing(false);

    onItemChange({
      ...item,
      length: roundedLength,
    });

    setLength(roundedLength);
  }, [item, length, onItemChange]);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${classes.resizer}`}
      key={item.id}
      onStart={handleDragStart}
      onStop={handleDragStop}
      position={{ x: item.x * step, y: 0 }}
    >
      <div
        className={classnames(classes.root, {
          [classes.dragging]: isDragging,
          [classes.resizing]: isResizing,
        })}
        style={{ width: length * step, ...style }}
      >
        <ContentComponent isDragging={isDragging} item={item} step={step} />
        <Draggable
          axis="x"
          bounds={{
            bottom: undefined,
            left: step - 16,
            right: undefined,
            top: undefined,
          }}
          onDrag={handleResizerDrag}
          onStart={handleResizerDragStart}
          onStop={handleResizerDragStop}
          position={{ x: item.length * step - 16, y: 0 }}
        >
          <div className={classes.resizer} />
        </Draggable>
      </div>
    </Draggable>
  );
}

export default React.memo(withStyles(styles)(Box));
