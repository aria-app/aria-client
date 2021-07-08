import { Box, MotionBox, useThemeWithDefault } from 'aria-ui';
import { AnimatePresence } from 'framer-motion';
import times from 'lodash/fp/times';
import round from 'lodash/round';
import { transparentize } from 'polished';
import { FC, memo, useCallback, useState } from 'react';
import Draggable from 'react-draggable';

export interface RulerProps {
  measureCount: number;
  measureWidth: number;
  onMeasureCountChange: (changedMeasureCount: number) => void;
  onPositionSet: (changedPosition: number) => void;
}

export const Ruler: FC<RulerProps> = memo((props) => {
  const { measureCount, measureWidth, onMeasureCountChange, onPositionSet } =
    props;
  const [isResizing, setIsResizing] = useState(false);
  const [length, setLength] = useState(measureCount);
  const theme = useThemeWithDefault();

  const handleClick = useCallback(
    (e) => {
      const measures = e.nativeEvent.offsetX / measureWidth;
      const notesPerMeasure = 32;

      onPositionSet(round(measures * notesPerMeasure));
    },
    [measureWidth, onPositionSet],
  );

  const handleResizerDragStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizerDrag = useCallback(
    (e, dragData) => {
      setLength(Math.max(1, (dragData.lastX - 16) / measureWidth));
    },
    [measureWidth],
  );

  const handleResizerDragStop = useCallback(() => {
    const roundedLength = Math.max(1, Math.round(length));

    setIsResizing(false);

    onMeasureCountChange(roundedLength);

    setLength(roundedLength);
  }, [length, onMeasureCountChange]);

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
          (i) => (
            <MotionBox
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={i}
              paddingBottom={0.25}
              paddingLeft={0.75}
              style={{ transform: `translateX(${i * 64}px)` }}
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
              <Box
                sx={{
                  color: transparentize(
                    0.5,
                    theme.colors.textPrimary as string,
                  ),
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
              >
                {i + 1}
              </Box>
            </MotionBox>
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
        <Box
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
                : 'border-color 200ms ease, transition 200ms ease',
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
