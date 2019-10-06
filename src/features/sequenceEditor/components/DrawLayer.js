import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import split from 'lodash/fp/split';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import Note from './Note';

const styles = {
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
};

function DrawLayer(props) {
  const ref = React.useRef();
  const { classes, mousePoint, onDraw } = props;
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const ghostNoteNote = React.useMemo(
    () => ({
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
        <Note className={classes.ghostNote} note={ghostNoteNote} />,
      )}
    </div>
  );
}

DrawLayer.propTypes = {
  mousePoint: PropTypes.object,
  onDraw: PropTypes.func,
};

export default withStyles(styles)(DrawLayer);
