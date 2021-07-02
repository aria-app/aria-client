import styled from '@emotion/styled';
import { FC, HTMLAttributes } from 'react';

const Root = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.textPrimary,
  bottom: 0,
  left: 0,
  opacity: 0.25,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 2,
  zIndex: 9999,
}));

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
  offset: number;
}

export const Timeline: FC<TimelineProps> = (props) => {
  const { isVisible, offset, style = {}, ...rest } = props;

  if (!isVisible) return null;

  return (
    <Root
      style={{ ...style, transform: `translateX(${offset}px)` }}
      {...rest}
    />
  );
};
