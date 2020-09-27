import isEqual from 'lodash/fp/isEqual';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import { DraggableCore } from 'react-draggable';
import Fence from './Fence';

const styles = createStyles({
  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

// export interface SelectorProps extends WithStyles<typeof styles> {
//   isEnabled?: boolean;
//   onSelect?: (startPoint: Point, endPoint: Point, isAdditive: boolean) => void;
//   scrollLeftEl?: HTMLElement;
//   scrollTopEl?: HTMLElement;
// }

function Selector(props) {
  const { classes, isEnabled, onSelect, scrollLeftEl, scrollTopEl } = props;
  const [endPoint, setEndPoint] = React.useState();
  const [startPoint, setStartPoint] = React.useState();

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
    (e) => {
      onSelect(startPoint, endPoint || startPoint, e.ctrlKey || e.metaKey);

      setEndPoint(undefined);
      setStartPoint(undefined);
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
        style={{ pointerEvents: isEnabled ? 'all' : 'none' }}
      >
        <Fence endPoint={endPoint} startPoint={startPoint} />
      </div>
    </DraggableCore>
  );
}

export default React.memo(withStyles(styles)(Selector));

function dragDataToGridPoint(dragData) {
  return {
    x: Math.floor(dragData.x / 40),
    y: Math.floor(dragData.y / 40),
  };
}
