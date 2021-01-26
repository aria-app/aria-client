import Box from '@material-ui/core/Box';
import { AnimatePresence, motion } from 'framer-motion';
import flatten from 'lodash/fp/flatten';
import PropTypes from 'prop-types';
import React from 'react';

import { stackAlignments } from '../constants';
import Divider from './Divider';

Stack.propTypes = {
  align: PropTypes.oneOf(stackAlignments),
  component: PropTypes.elementType,
  dividerThickness: PropTypes.string,
  isAnimated: PropTypes.bool,
  itemProps: PropTypes.object,
  showDividers: PropTypes.bool,
  space: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function Stack(props) {
  const {
    align,
    children,
    component = 'div',
    dividerThickness = 'thin',
    isAnimated,
    componentProps = {},
    showDividers,
    space,
    sx = {},
    ...rest
  } = props;
  const { itemProps = {} } = componentProps;

  const Wrapper = isAnimated ? AnimatePresence : React.Fragment;

  return (
    <Box
      as={component}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...rest}
    >
      <Box
        sx={{
          alignItems: {
            center: 'center',
            left: 'flex-start',
            right: 'flex-end',
            stretch: 'stretch',
          }[align],
          display: 'flex',
          flexDirection: 'column',
          marginTop: space ? `-${space}` : undefined,
        }}
      >
        <Wrapper>
          {flatten(
            React.Children.map(children, (child, index) =>
              showDividers && index
                ? [
                    <Box
                      component={motion.div}
                      layout={isAnimated}
                      sx={{ alignSelf: 'stretch', paddingTop: space }}
                      {...itemProps}
                    >
                      <Divider thickness={dividerThickness} />
                    </Box>,
                    <Box
                      component={motion.div}
                      layout={isAnimated}
                      sx={{ paddingTop: space }}
                      {...itemProps}
                    >
                      {child}
                    </Box>,
                  ]
                : [
                    <Box
                      component={motion.div}
                      layout={isAnimated}
                      sx={{ paddingTop: space }}
                      {...itemProps}
                    >
                      {child}
                    </Box>,
                  ],
            ),
          )}
        </Wrapper>
      </Box>
    </Box>
  );
}
