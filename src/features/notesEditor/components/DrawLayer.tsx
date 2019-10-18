import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import noop from 'lodash/fp/noop';
import split from 'lodash/fp/split';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { showIf } from 'react-render-helpers';
import { Point } from '../../shared/types';
import Note from './Note';

const styles = createStyles({
  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  ghostNote: {
    opacity: 0.4,
    pointerEvents: 'none',
  },
});

export interface DrawLayerProps extends WithStyles<typeof styles> {
  mousePoint?: Point;
  onDraw?: (startingPoint: Point) => void;
}

function DrawLayer(props: DrawLayerProps) {
  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef();
  const { classes, mousePoint, onDraw } = props;
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const ghostNoteNote = React.useMemo(
    () => ({
      id: '',
      points: [
        {
          x: mousePoint ? mousePoint.x : 0,
          y: mousePoint ? mousePoint.y : 0,
        },
        {
          x: mousePoint ? mousePoint.x + 1 : 0,
          y: mousePoint ? mousePoint.y : 0,
        },
      ],
      sequenceId: '',
    }),
    [mousePoint],
  );

  const handleMouseDown = React.useCallback(() => {
    setIsDrawing(true);
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeave = React.useCallback(
    e => {
      setIsMouseOver(false);

      if (!isDrawing) return;

      const primaryClassName = `.${compose(
        first,
        split(' '),
      )(e.target.className)}`;
      const isDescendant = !!ref.current.querySelector(primaryClassName);

      if (isDescendant) return;

      setIsDrawing(false);
    },
    [isDrawing],
  );

  const handleMouseUp = React.useCallback(() => {
    if (!isDrawing) return;

    onDraw(mousePoint);

    setIsDrawing(false);
  }, [isDrawing, mousePoint, onDraw]);

  return (
    <div
      className={classes.root}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      {showIf(isMouseOver)(
        <Note
          className={classes.ghostNote}
          note={ghostNoteNote}
          onDrag={noop}
          onDragStart={noop}
          onDragStop={noop}
          onEndPointDrag={noop}
          onEndPointDragStart={noop}
          onEndPointDragStop={noop}
        />,
      )}
    </div>
  );
}

export default React.memo(withStyles(styles)(DrawLayer));
