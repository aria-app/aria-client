import { Box, MotionBox, Text, useThemeWithDefault } from 'aria-ui';
import { AnimatePresence } from 'framer-motion';
import times from 'lodash/fp/times';
import round from 'lodash/round';
import {
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Draggable from 'react-draggable';

const Measure: FC<{ index: number; measureWidth: number }> = memo(
  ({ index, measureWidth }) => {
    const theme = useThemeWithDefault();

    return (
      <MotionBox
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        paddingBottom={0.25}
        paddingLeft={0.75}
        style={{ transform: `translateX(${index * measureWidth}px)` }}
        sx={{
          alignItems: 'flex-end',
          bottom: 2,
          display: 'flex',
          left: 2,
          position: 'absolute',
          top: 2,
          '&:not(:first-of-type)': {
            borderLeft: `2px solid ${theme.colors.border}`,
          },
        }}
        transition={{ duration: 0.1 }}
      >
        <Text
          sx={{
            opacity: 0.5,
            fontSize: 10,
            fontWeight: 'bold',
          }}
        >
          {index + 1}
        </Text>
      </MotionBox>
    );
  },
);

export type RulerMeasureCountChangeHandler = (
  changedMeasureCount: number,
) => void;

export interface RulerProps {
  measureCount: number;
  measureWidth: number;
  onMeasureCountChange: RulerMeasureCountChangeHandler;
  onPositionSet: (changedPosition: number) => void;
}

export const Ruler: FC<RulerProps> = memo((props) => {
  const { measureCount, measureWidth, onMeasureCountChange, onPositionSet } =
    props;
  const resizerNodeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [length, setLength] = useState(measureCount);
  const theme = useThemeWithDefault();

  const handleClick = useCallback<MouseEventHandler>(
    (e) => {
      if (e.defaultPrevented) return;

      const measures = e.nativeEvent.offsetX / measureWidth;
      const notesPerMeasure = 32;

      onPositionSet(round(measures * notesPerMeasure));
    },
    [measureWidth, onPositionSet],
  );

  const handleResizerDragStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizerClick = useCallback<MouseEventHandler>((e) => {
    e.preventDefault();
  }, []);

  const handleResizerDrag = useCallback(
    (e, dragData) => {
      setLength(Math.max(1, (dragData.lastX - 16) / measureWidth));
    },
    [measureWidth],
  );

  const handleResizerDragStop = useCallback(
    (e) => {
      e.preventDefault();

      const roundedLength = Math.max(1, Math.round(length));

      setIsResizing(false);

      if (roundedLength !== measureCount) {
        onMeasureCountChange(roundedLength);
      }

      setLength(measureCount);
    },
    [length, measureCount, onMeasureCountChange],
  );

  useEffect(() => {
    setLength(measureCount);
  }, [measureCount]);

  return (
    <Box
      backgroundColor="backgroundContrast"
      borderRadius="md"
      onClick={handleClick}
      padding={0.5}
      style={{ width: measureWidth * length + 4 }}
      sx={{
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
            }
          : {}),
      }}
    >
      <AnimatePresence>
        {times(
          (index) => (
            <Measure
              index={index}
              key={`measure-${index}`}
              measureWidth={measureWidth}
            />
          ),
          Math.round(length),
        )}
      </AnimatePresence>
      <Draggable
        axis="x"
        bounds={{
          bottom: undefined,
          left: measureWidth - 16,
          right: undefined,
          top: undefined,
        }}
        nodeRef={resizerNodeRef}
        onDrag={handleResizerDrag}
        onStart={handleResizerDragStart}
        onStop={handleResizerDragStop}
        position={{ x: length * measureWidth + 16, y: 0 }}
      >
        <Box
          onClick={handleResizerClick}
          ref={resizerNodeRef}
          sx={{
            position: 'absolute',
          }}
        >
          <Box
            backgroundColor="backgroundContrast"
            borderRadius="md"
            padding={0.5}
            sx={{
              cursor: 'col-resize',
              height: 34,
              left: 0,
              position: 'absolute',
              top: -1,
              transition: isResizing
                ? 'none'
                : 'border-color 200ms ease, transform 200ms ease',
              width: 24,
              '&:hover': {
                borderColor: theme.colors.textSecondary,
              },
              '&::after': {
                borderLeft: `2px dotted ${theme.colors.textSecondary}`,
                borderRight: `2px dotted ${theme.colors.textSecondary}`,
                content: "''",
                display: 'block',
                height: 10,
                left: '50%',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 4,
              },
            }}
          />
        </Box>
      </Draggable>
    </Box>
  );
});
