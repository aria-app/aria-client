import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

const Root = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  bottom: 0,
  left: 0,
  opacity: 0.25,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 2,
}));

Timeline.propTypes = {
  isVisible: PropTypes.bool,
  offset: PropTypes.number,
};

function Timeline(props) {
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
