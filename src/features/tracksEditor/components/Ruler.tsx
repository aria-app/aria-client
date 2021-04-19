import styled from '@emotion/styled/macro';
import { AnimatePresence, motion } from 'framer-motion';
import times from 'lodash/fp/times';
import round from 'lodash/round';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import Draggable from 'react-draggable';

const Resizer = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'col-resize',
  height: 34,
  left: 0,
  position: 'absolute',
  top: -1,
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
}));

interface RootProps {
  isResizing: boolean;
}

const Root = styled.div<RootProps>(({ isResizing, theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 36,
  position: 'relative',
  transition: 'width 200ms ease',
  ...(isResizing
    ? {
        cursor: 'col-resize',
        transition: 'none',
        zIndex: 200,
      }
    : {}),
  [Resizer as any]: {
    transition: isResizing
      ? 'none'
      : 'border-color 200ms ease, transition 200ms ease',
  },
}));

const Measure = styled(motion.div)(({ theme }) => ({
  alignItems: 'flex-end',
  bottom: 0,
  display: 'flex',
  left: 0,
  paddingBottom: theme.spacing(0.25),
  paddingLeft: theme.spacing(0.75),
  position: 'absolute',
  top: 0,
  '&:not(:first-of-type)': {
    borderLeft: `2px solid ${theme.palette.divider}`,
  },
}));

const MeasureNumber = styled.div(({ theme }) => ({
  color: transparentize(0.5, theme.palette.text.primary),
  fontSize: 10,
  fontWeight: 'bold',
}));

const ResizerDraggableWrapper = styled.div({
  position: 'absolute',
});

Ruler.propTypes = {
  measureCount: PropTypes.number,
  measureWidth: PropTypes.number,
  onMeasureCountChange: PropTypes.func,
  onPositionSet: PropTypes.func,
};

function Ruler(props: any) {
  const {
    measureCount,
    measureWidth,
    onMeasureCountChange,
    onPositionSet,
  } = props;
  const [isResizing, setIsResizing] = React.useState(false);
  const [length, setLength] = React.useState(measureCount);

  const handleClick = React.useCallback(
    (e) => {
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
    <Root
      isResizing={isResizing}
      onClick={handleClick}
      style={{ width: measureWidth * length + 4 }}
    >
      <AnimatePresence>
        {times(
          (i) => (
            <Measure
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={i}
              style={{ transform: `translateX(${i * 64}px)` }}
              transition={{ duration: 0.1 }}
            >
              <MeasureNumber>{i + 1}</MeasureNumber>
            </Measure>
          ),
          Math.round(length),
        )}
      </AnimatePresence>
      <Draggable
        axis="x"
        bounds={{
          bottom: undefined,
          left: 64 - 16,
          right: undefined,
          top: undefined,
        }}
        onDrag={handleResizerDrag}
        onStart={handleResizerDragStart}
        onStop={handleResizerDragStop}
        position={{ x: length * 64 + 16, y: 0 }}
      >
        <ResizerDraggableWrapper>
          <Resizer />
        </ResizerDraggableWrapper>
      </Draggable>
    </Root>
  );
}

export default React.memo(Ruler);
