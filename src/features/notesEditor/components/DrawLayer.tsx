import styled from '@emotion/styled';
import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import noop from 'lodash/fp/noop';
import split from 'lodash/fp/split';
import PropTypes from 'prop-types';
import React from 'react';

import Note from './Note';

const Root = styled.div(({ theme }) => ({
  ...theme.mixins.absoluteFill,
}));

const StyledNote = styled(Note)({
  opacity: 0.4,
  pointerEvents: 'none',
});

DrawLayer.propTypes = {
  mousePoint: PropTypes.object,
  onDraw: PropTypes.func,
};

function DrawLayer(props: any) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { mousePoint, onDraw } = props;
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const ghostNoteNote = React.useMemo(
    () => ({
      id: -1,
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
      sequenceId: -1,
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
    (e) => {
      setIsMouseOver(false);

      if (!isDrawing) return;

      const primaryClassName = `.${compose(
        first,
        split(' '),
      )(e.target.className)}`;
      const isDescendant = !!ref?.current?.querySelector(primaryClassName);

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
    <Root
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      {isMouseOver && (
        <StyledNote
          note={ghostNoteNote}
          onDrag={noop}
          onDragStart={noop}
          onDragStop={noop}
          onEndPointDrag={noop}
          onEndPointDragStart={noop}
          onEndPointDragStop={noop}
        />
      )}
    </Root>
  );
}

export default React.memo(DrawLayer);
