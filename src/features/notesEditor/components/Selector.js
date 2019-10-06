import isEqual from 'lodash/fp/isEqual';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { DraggableCore } from 'react-draggable';
import Fence from './Fence';

const styles = {
  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
};

function Selector(props) {
  const { classes, isEnabled, onSelect, scrollLeftEl, scrollTopEl } = props;
  const [endPoint, setEndPoint] = React.useState({});
  const [startPoint, setStartPoint] = React.useState({});

  const handleDrag = (e, dragData) => {
    const shouldScrollDown =
      window.innerHeight - e.pageY < 80 + 128 && dragData.deltaY >= 0;
    const shouldScrollLeft = e.pageX < 80 && dragData.deltaX <= 0;
    const shouldScrollRight =
      window.innerWidth - e.pageX < 80 && dragData.deltaX >= 0;
    const shouldScrollUp = e.pageY < 80 && dragData.deltaY <= 0;

    if (shouldScrollDown) {
      scrollTopEl.scrollTop = scrollTopEl.scrollTop + 20;
    }

    if (shouldScrollLeft) {
      scrollLeftEl.scrollLeft = scrollLeftEl.scrollLeft - 20;
    }

    if (shouldScrollRight) {
      scrollLeftEl.scrollLeft = scrollLeftEl.scrollLeft + 20;
    }

    if (shouldScrollUp) {
      scrollTopEl.scrollTop = scrollTopEl.scrollTop - 20;
    }

    const newEndPoint = dragDataToGridPoint(dragData);

    if (isEqual(newEndPoint, endPoint)) return null;

    setEndPoint(newEndPoint);
  };

  const handleDragStart = React.useCallback((e, dragData) => {
    setStartPoint(dragDataToGridPoint(dragData));
  }, []);

  const handleDragStop = React.useCallback(
    e => {
      onSelect(startPoint, endPoint, e.ctrlKey || e.metaKey);

      setEndPoint({});
      setStartPoint({});
    },
    [endPoint, onSelect, startPoint],
  );

  return (
    <DraggableCore
      grid={[40, 40]}
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <div
        className={classes.root}
        style={{
          pointerEvents: isEnabled ? 'all' : 'none',
        }}
      >
        <Fence endPoint={endPoint} startPoint={startPoint} />
      </div>
    </DraggableCore>
  );
}

Selector.propTypes = {
  classes: PropTypes.object,
  isEnabled: PropTypes.bool,
  onSelect: PropTypes.func,
  scrollLeftEl: PropTypes.object,
  scrollTopEl: PropTypes.object,
};

export default React.memo(withStyles(styles)(Selector));

function dragDataToGridPoint(dragData) {
  return {
    x: Math.floor(dragData.x / 40),
    y: Math.floor(dragData.y / 40),
  };
}
