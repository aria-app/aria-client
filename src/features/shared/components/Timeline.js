import styled from 'styled-components/macro';

export default styled.div.attrs(props => ({
  style: {
    ...props.style,
    transform: `translateX(${props.offset}px)`,
  },
}))(props => ({
  backgroundColor: props.theme.almostwhite,
  bottom: 0,
  display: props.isVisible ? 'block' : 'none',
  left: 0,
  opacity: 0.25,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: 2,
}));
