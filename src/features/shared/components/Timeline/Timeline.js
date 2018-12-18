import styled from 'styled-components';

export const Timeline = styled.div.attrs(props => ({
  style: {
    ...props.style,
    transform: `translateX(${props.offset}px)`,
  },
}))`
  background-color: ${props => props.theme.almostwhite};
  bottom: 0;
  display: ${props => props.isVisible
    ? 'block'
    : 'none'};
  left: 0;
  opacity: 0.25;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 2px;
`;
