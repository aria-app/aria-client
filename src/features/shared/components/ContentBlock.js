import Box from '@material-ui/core/Box';
import React from 'react';

export default React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    sx={{ marginX: 'auto', maxWidth: '640px', width: '100%' }}
    {...props}
  />
));
