import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Root = styled.div({
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 64,
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  transition: 'transform 200ms ease',
  width: 64,
});

const Icon = styled(AddIcon)(({ theme }) => ({
  fill: theme.palette.primary.light,
}));

const Button = styled(Fab)(({ theme }) => ({
  '&&': {
    backgroundColor: 'transparent',
    border: `2px solid ${theme.palette.primary.light}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.main,
      [Icon]: {
        fill: theme.palette.primary.main,
      },
    },
  },
}));

AddSequenceButton.propTypes = {
  onClick: PropTypes.func,
  position: PropTypes.number,
};

function AddSequenceButton(props) {
  const { onClick, position } = props;

  const handleClick = React.useCallback(() => {
    onClick(position);
  }, [onClick, position]);

  return (
    <Root
      onClick={handleClick}
      style={{ transform: `translateX(${position * 64}px)` }}
    >
      <Button size="small">
        <Icon />
      </Button>
    </Root>
  );
}

export default React.memo(AddSequenceButton);
