import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';

const Root = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  bottom: 0,
  left: 0,
  opacity: 0.25,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 2,
  zIndex: 9999,
}));

Timeline.propTypes = {
  isVisible: PropTypes.bool,
  offset: PropTypes.number,
};

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
  offset: number;
}

function Timeline(props: TimelineProps) {
  const { isVisible, offset, style = {}, ...rest } = props;

  if (!isVisible) return null;

  return (
    <Root
      style={{ ...style, transform: `translateX(${offset}px)` }}
      {...rest}
    />
  );
}

export default React.memo(Timeline);
