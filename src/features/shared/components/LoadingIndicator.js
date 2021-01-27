import React from 'react';

import Box from './Box';

const LoadingIndicator = React.forwardRef((props, ref) => (
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

export default LoadingIndicator;
