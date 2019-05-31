import React from 'react';
import styled from '@material-ui/styles/styled';

export default React.memo(
  styled('div')(props => ({
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: props.theme.palette.primary.dark,
    color: props.theme.palette.primary.contrastText,
    display: 'flex',
    fontWeight: 800,
    height: 28,
    marginBottom: props.theme.spacing(1),
    paddingLeft: props.theme.spacing(1),
    paddingRight: props.theme.spacing(1),
    textTransform: 'uppercase',
    transform: 'scale(1)',
    transition: 'transform 0.2s ease',
    '&:hover:not(:active)': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.9)',
    },
  })),
);
