import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { memo } from 'react';

import { Point } from '../../../types';

const Column = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.9, theme.palette.primary.main),
  borderRadius: theme.shape.borderRadius,
  bottom: 0,
  left: 6,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 28,
}));

const Row = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.9, theme.palette.primary.main),
  borderRadius: theme.shape.borderRadius,
  left: 0,
  height: 28,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: 6,
}));

export interface PositionIndicatorProps {
  mousePoint: Point;
}

function PositionIndicator(props: PositionIndicatorProps) {
  const { mousePoint } = props;
  const { x, y } = mousePoint;

  return (
    <>
      {x >= 0 ?? <Column style={{ transform: `translateX(${x * 40}px)` }} />}
      {y >= 0 ?? <Row style={{ transform: `translateY(${y * 40}px)` }} />}
    </>
  );
}

export default memo(PositionIndicator);
