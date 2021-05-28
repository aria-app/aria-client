import isEqual from 'lodash/fp/isEqual';
import { memo, useMemo } from 'react';

import { Point } from '../../../types';
import shared from '../../shared';

const { Box } = shared.components;

export interface FenceProps {
  endPoint?: Point;
  startPoint?: Point;
}

function Fence(props: FenceProps) {
  const { endPoint, startPoint } = props;

  const display = useMemo(
    () => (startPoint && !isEqual(startPoint, endPoint) ? 'block' : 'none'),
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
      style={{ display, height, transform, width }}
      sx={{
        backgroundColor: 'primary.main25',
        borderColor: 'primary.main',
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth: 2,
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
      }}
    />
  );
}

export default memo(Fence);
