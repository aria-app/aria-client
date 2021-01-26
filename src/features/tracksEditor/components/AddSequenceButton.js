import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

AddSequenceButton.propTypes = {
  onClick: PropTypes.func,
  position: PropTypes.number,
};

export default function AddSequenceButton(props) {
  const { onClick, position } = props;

  const handleClick = React.useCallback(() => {
    onClick(position);
  }, [onClick, position]);

  return (
    <Box
      onClick={handleClick}
      style={{ transform: `translateX(${position * 64}px)` }}
      sx={{
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
      }}
    >
      <Fab
        size="small"
        sx={{
          '&&': {
            backgroundColor: 'transparent',
            borderColor: 'primary.light',
            borderRadius: 1,
            borderStyle: 'solid',
            borderWidth: 2,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: 'primary.main',
              '.MuiIcon-root': {
                color: 'primary.main',
              },
            },
          },
        }}
      >
        <AddIcon sx={{ color: 'primary.light' }} />
      </Fab>
    </Box>
  );
}
