import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'transform 200ms ease',
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
    zIndex: '2',
  },
  dragging: {
    zIndex: 200,
  },
});

function Box(props) {
  const {
    classes,
    contentComponent: ContentComponent = () => null,
    item,
    onItemChange,
    step = 100,
    style = {},
  } = props;
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDrag = React.useCallback(
    (e, position) => {
      onItemChange({
        ...item,
        x: position.x / step,
      });
    },
    [item, onItemChange, step],
  );

  const handleDragStart = React.useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleResizerDrag = React.useCallback(
    (e, position) => {
      onItemChange({
        ...item,
        length: Math.max(1, item.length + position.deltaX / step),
      });
    },
    [item, onItemChange, step],
  );

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel={`.${classes.resizer}`}
      grid={[step, 0]}
      key={item.id}
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={handleDragStop}
      position={{ x: item.x * step, y: 0 }}
    >
      <div
        className={classes.root}
        style={{ width: item.length * step, ...style }}
      >
        <ContentComponent isDragging={isDragging} item={item} step={step} />
        <Draggable
          axis="x"
          bounds={{ left: step - 16 }}
          grid={[step, 0]}
          onDrag={handleResizerDrag}
          position={{ x: item.length * step - 16, y: 0 }}
        >
          <div className={classes.resizer} />
        </Draggable>
      </div>
    </Draggable>
  );
}

Box.propTypes = {
  classes: PropTypes.object,
  contentComponent: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.any,
    x: PropTypes.number,
    length: PropTypes.number,
  }),
  onItemChange: PropTypes.func,
  step: PropTypes.number,
  style: PropTypes.object,
};

export default React.memo(withStyles(styles)(Box));
