import React from 'react';
import styled from '@material-ui/styles/styled';

export default styled(props => (
  <div
    className={props.className}
    style={{ ...props.style, transform: `translateX(${props.offset}px)` }}
  />
))(props => ({
  backgroundColor: props.theme.palette.text.primary,
  bottom: 0,
  display: props.isVisible ? 'block' : 'none',
  left: 0,
  opacity: 0.25,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 2,
}));
