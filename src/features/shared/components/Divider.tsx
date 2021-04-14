import MuiDivider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React from 'react';

const Divider = React.forwardRef((props: any, ref) => {
  const { sx = {}, thickness, ...rest } = props;

  return (
    <MuiDivider
      ref={ref}
      sx={{
        borderBottomWidth: thickness === 'thin' ? 1 : 2,
        ...sx,
      }}
      {...rest}
    />
  );
});

Divider.propTypes = {
  thickness: PropTypes.oneOf(['regular', 'thin']),
};

export default Divider;
