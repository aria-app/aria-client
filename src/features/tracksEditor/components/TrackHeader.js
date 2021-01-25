import React from 'react';
import styled from 'styled-components';

const Root = styled.div(({ theme }) => ({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
  transform: 'scale(1)',
  transition: 'transform 0.2s ease',
}));

const Icon = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  height: 28,
  position: 'relative',
  width: 28,
  '&::after': {
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1),
    content: '""',
    display: 'block',
    height: 12,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 12,
  },
}));

const Text = styled.div(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 800,
  marginBottom: -3,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

function TrackHeader(props) {
  const { children, ...rest } = props;

  return (
    <Root {...rest}>
      <Icon />
      <Text>{children}</Text>
    </Root>
  );
}

export default React.memo(TrackHeader);
