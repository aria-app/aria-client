import flatten from 'lodash/fp/flatten';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { stackAlignments } from '../constants';
import Box, { spacingPropType } from './Box';
import Divider from './Divider';

const Root = styled.div((props) => ({
  alignItems: {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end',
    stretch: 'stretch',
  }[props.align],
  display: 'flex',
  flexDirection: 'column',
}));

Stack.propTypes = {
  align: PropTypes.oneOf(stackAlignments),
  component: PropTypes.elementType,
  dividerThickness: PropTypes.string,
  space: spacingPropType,
};

export default function Stack(props) {
  const {
    children,
    component = 'div',
    dividerThickness = 'thin',
    showDividers,
    space,
    ...rest
  } = props;

  return (
    <Root as={component} {...rest}>
      {flatten(
        React.Children.map(children, (child, index) =>
          showDividers && index
            ? [
                <Box
                  paddingTop={index ? space : undefined}
                  style={{ alignSelf: 'stretch' }}
                >
                  <Divider thickness={dividerThickness} />
                </Box>,
                <Box paddingTop={index ? space : undefined}>{child}</Box>,
              ]
            : [<Box paddingTop={index ? space : undefined}>{child}</Box>],
        ),
      )}
    </Root>
  );
}
