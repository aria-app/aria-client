import flatten from 'lodash/fp/flatten';
import PropTypes from 'prop-types';
import React from 'react';

import Box from './Box';
import Divider from './Divider';

Stack.propTypes = {
  component: PropTypes.elementType,
  direction: PropTypes.oneOf([
    'column',
    'column-reverse',
    'row',
    'row-reverse',
  ]),
  dividerThickness: PropTypes.string,
  showDividers: PropTypes.bool,
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function Stack(props) {
  const {
    children,
    component = 'div',
    direction = 'column',
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
        flexDirection: direction,
        '& > * + *': {
          [{
            column: 'marginTop',
            'column-reverse': 'marginBottom',
            row: 'marginLeft',
            'row-reverse': 'marginRight',
          }[direction]]: space,
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
