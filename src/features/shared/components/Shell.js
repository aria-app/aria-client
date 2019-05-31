import styled from '@material-ui/styles/styled';

export default styled('div')(props => ({
  backgroundColor: props.theme.palette.background.default,
  color: props.theme.palette.text.primary,
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
