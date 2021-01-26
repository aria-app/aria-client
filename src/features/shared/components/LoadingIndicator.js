import Box from '@material-ui/core/Box';
import React from 'react';

export default React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    sx={{
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      flex: '1 1 auto',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    }}
    {...props}
  />
));
