import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

export default function AddTrackButton(props) {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        height: 64,
        transition: 'transform 200ms ease',
      }}
      {...props}
    >
      <Fab
        sx={{
          '&&': {
            backgroundColor: 'transparent',
            borderColor: 'text.hint',
            borderRadius: 1,
            borderStyle: 'solid',
            borderWidth: 2,
            boxShadow: 'none',
            color: 'text.hint',
            paddingLeft: 3,
            paddingRight: 4,
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: 'text.secondary',
              color: 'text.secondary',
              '& .MuiSvgIcon-root': {
                color: 'text.secondary',
              },
            },
          },
        }}
        variant="extended"
      >
        <AddIcon sx={{ color: 'text.hint', marginRight: 3 }} />
        <Box sx={{ marginBottom: -0.5 }}>Add Track</Box>
      </Fab>
    </Box>
  );
}
