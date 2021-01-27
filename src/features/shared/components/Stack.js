import Box from '@material-ui/core/Box';
import flatten from 'lodash/fp/flatten';
import PropTypes from 'prop-types';
import React from 'react';

import Divider from './Divider';

Stack.propTypes = {
  component: PropTypes.elementType,
  dividerThickness: PropTypes.string,
  showDividers: PropTypes.bool,
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function Stack(props) {
  const {
    children,
    component = 'div',
    dividerThickness = 'thin',
    showDividers,
    space,
    sx = {},
    ...rest
  } = props;

  return (
    <Box
      as={component}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
          marginTop: space,
        },
        ...sx,
      }}
      {...rest}
    >
      {flatten(
        React.Children.map(children, (child, index) =>
          showDividers && index
            ? [<Divider thickness={dividerThickness} />, child]
            : [child],
        ),
      )}
    </Box>
  );
}
