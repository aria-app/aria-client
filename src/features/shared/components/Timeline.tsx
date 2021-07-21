import { CSSObject } from '@emotion/react';
import { Box } from 'aria-ui';
import { CSSProperties } from 'react';
import { FC, useMemo } from 'react';

export interface TimelineProps {
  isVisible: boolean;
  offset: number;
}

export const Timeline: FC<TimelineProps> = (props) => {
  const { isVisible, offset } = props;

  const style = useMemo<CSSProperties>(
    () => ({ transform: `translateX(${offset}px)` }),
    [offset],
  );

  const sx = useMemo<CSSObject>(
    () => ({
      bottom: 0,
      label: 'Timeline',
      left: 0,
      opacity: 0.25,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: 2,
      zIndex: 9999,
    }),
    [],
  );

  if (!isVisible) return null;

  return <Box backgroundColor="textPrimary" style={style} sx={sx} />;
};
