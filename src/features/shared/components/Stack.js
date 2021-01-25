import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import flatten from 'lodash/fp/flatten';
import PropTypes from 'prop-types';
import React from 'react';

import { stackAlignments } from '../constants';
import Box, { spacingPropType } from './Box';
import Divider from './Divider';

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Content = styled(Box)((props) => ({
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
  isAnimated: PropTypes.bool,
  itemProps: PropTypes.object,
  showDividers: PropTypes.bool,
  space: spacingPropType,
};

export default function Stack(props) {
  const {
    children,
    component = 'div',
    dividerThickness = 'thin',
    isAnimated,
    itemProps = {},
    showDividers,
    space,
    ...rest
  } = props;

  const Wrapper = isAnimated ? AnimatePresence : React.Fragment;

  return (
    <Root as={component} {...rest}>
      <Content marginTop={props.space ? `-${props.space}` : undefined}>
        <Wrapper>
          {flatten(
            React.Children.map(children, (child, index) =>
              showDividers && index
                ? [
                    <Box
                      component={motion.div}
                      layout={isAnimated}
                      paddingTop={space}
                      style={{ alignSelf: 'stretch' }}
                      {...itemProps}
                    >
                      <Divider thickness={dividerThickness} />
                    </Box>,
                    <Box
                      component={motion.div}
                      layout={isAnimated}
                      paddingTop={space}
                      {...itemProps}
                    >
                      {child}
                    </Box>,
                  ]
                : [
                    <Box
                      component={motion.div}
                      layout={isAnimated}
                      paddingTop={space}
                      {...itemProps}
                    >
                      {child}
                    </Box>,
                  ],
            ),
          )}
        </Wrapper>
      </Content>
    </Root>
  );
}
