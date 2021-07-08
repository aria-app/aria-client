import { Box, BoxProps } from 'aria-ui';
import { FC } from 'react';

export interface TimelineProps extends BoxProps<'div'> {
  isVisible: boolean;
  offset: number;
}

export const Timeline: FC<TimelineProps> = (props) => {
  const { isVisible, offset, style = {}, ...rest } = props;

  if (!isVisible) return null;

  return (
    <Box
      backgroundColor="textPrimary"
      style={{ ...style, transform: `translateX(${offset}px)` }}
      sx={{
        bottom: 0,
        left: 0,
        opacity: 0.25,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: 2,
        zIndex: 9999,
      }}
      {...rest}
    />
  );
};
