import styled from 'styled-components/macro';

export default styled.div(props => ({
  backgroundColor: props.theme.backgroundColor,
  color: props.theme.almostwhite,
  bottom: 0,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
}));
