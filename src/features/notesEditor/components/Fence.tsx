import { Box, useThemeWithDefault } from 'aria-ui';
import isEqual from 'lodash/fp/isEqual';
import { transparentize } from 'polished';
import { FC, memo, useMemo } from 'react';

import { Point } from '../../../types';

export interface FenceProps {
  endPoint?: Point;
  startPoint?: Point;
}

export const Fence: FC<FenceProps> = memo((props) => {
  const { endPoint, startPoint } = props;
  const theme = useThemeWithDefault();

  const display = useMemo(
    () =>
      endPoint && startPoint && !isEqual(startPoint, endPoint)
        ? 'block'
        : 'none',
    [endPoint, startPoint],
  );

  const height = useMemo(() => {
    if (!startPoint || !endPoint) return 0;

    return (Math.abs(endPoint.y - startPoint.y) + 1) * 40;
  }, [endPoint, startPoint]);

  const transform = useMemo(() => {
    if (!startPoint || !endPoint) {
      return 'translate(0px, 0px)';
    }

    const x = Math.min(startPoint.x, endPoint.x) * 40;
    const y = Math.min(startPoint.y, endPoint.y) * 40;

    return `translate(${x}px, ${y}px)`;
  }, [endPoint, startPoint]);

  const width = useMemo(() => {
    if (!startPoint || !endPoint) return 0;

    return (Math.abs(endPoint.x - startPoint.x) + 1) * 40;
  }, [endPoint, startPoint]);

  return (
    <Box
      borderColor="brandPrimary"
      borderRadius="md"
      borderWidth={2}
      style={{ display, height, transform, width }}
      sx={{
        backgroundColor: transparentize(
          0.75,
          theme.colors.brandPrimary as string,
        ),
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
      }}
    />
  );
});
