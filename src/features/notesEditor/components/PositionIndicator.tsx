import { Box, useThemeWithDefault } from 'aria-ui';
import { transparentize } from 'polished';
import { FC, memo } from 'react';

import { Point } from '../../../types';

export interface PositionIndicatorProps {
  mousePoint: Point;
}

export const PositionIndicator: FC<PositionIndicatorProps> = memo((props) => {
  const { mousePoint } = props;
  const { x, y } = mousePoint;
  const theme = useThemeWithDefault();

  return (
    <>
      {x >= 0 && (
        <Box
          backgroundColor="brandPrimary"
          style={{ transform: `translateX(${x * 40}px)` }}
          sx={{
            borderRadius: theme.borderRadii.md,
            bottom: 0,
            label: 'PositionIndicatorColumn',
            left: 6,
            opacity: 0.1,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            width: 28,
          }}
        />
      )}
      {y >= 0 && (
        <Box
          backgroundColor="brandPrimary"
          style={{ transform: `translateY(${y * 40}px)` }}
          sx={{
            borderRadius: theme.borderRadii.md,
            label: 'PositionIndicatorRow',
            left: 0,
            height: 28,
            opacity: 0.1,
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            top: 6,
          }}
        />
      )}
    </>
  );
});
