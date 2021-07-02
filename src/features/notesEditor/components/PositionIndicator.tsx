import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { FC } from 'react';

import { Point } from '../../../types';

const Column = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.9, theme.colors.brandPrimary as string),
  borderRadius: theme.borderRadii.md,
  bottom: 0,
  left: 6,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 28,
}));

const Row = styled.div(({ theme }) => ({
  backgroundColor: transparentize(0.9, theme.colors.brandPrimary as string),
  borderRadius: theme.borderRadii.md,
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

export const PositionIndicator: FC<PositionIndicatorProps> = (props) => {
  const { mousePoint } = props;
  const { x, y } = mousePoint;

  return (
    <>
      {x >= 0 ?? <Column style={{ transform: `translateX(${x * 40}px)` }} />}
      {y >= 0 ?? <Row style={{ transform: `translateY(${y * 40}px)` }} />}
    </>
  );
};
