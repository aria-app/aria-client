import styled from 'styled-components/macro';

export default styled.div(props => ({
  alignItems: 'center',
  alignSelf: 'flex-start',
  backgroundColor: props.theme.primary[0],
  color: props.theme.almostblack,
  display: 'flex',
  fontWeight: 800,
  height: 28,
  marginBottom: props.theme.margin.s,
  paddingLeft: props.theme.margin.s,
  paddingRight: props.theme.margin.s,
  textTransform: 'uppercase',
  transform: 'scale(1)',
  transition: 'transform 0.2s ease',
  '&:hover:not(:active)': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
}));
