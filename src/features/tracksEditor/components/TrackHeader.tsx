import React from 'react';

import shared from '../../shared';

const { Box } = shared.components;

function TrackHeader(props: any) {
  const { children, ...rest } = props;

  return (
    <Box
      sx={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        textTransform: 'uppercase',
        transform: 'scale(1)',
        transition: 'transform 0.2s ease',
      }}
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: 1,
          height: 28,
          position: 'relative',
          width: 28,
          '&::after': {
            backgroundColor: 'primary.contrastText',
            borderRadius: 9999,
            content: '""',
            display: 'block',
            height: 12,
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
          },
        }}
      />
      <Box
        component="div"
        sx={{
          color: 'primary.dark',
          fontWeight: 800,
          marginBottom: -0.5,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default React.memo(TrackHeader);
