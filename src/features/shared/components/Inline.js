import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import { spacingAliases, verticalAlignments } from '../constants';
import Box from './Box';

const Root = styled.div({
  display: 'flex',
});

const Content = styled(Box)(({ align, alignY }) => ({
  alignItems: {
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }[alignY],
  display: 'flex',
  justifyContent: {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end',
  }[align],
  flexWrap: 'wrap',
}));

const Item = styled(Box)({
  display: 'flex',
});

Inline.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  alignY: PropTypes.oneOf(verticalAlignments),
  isReversed: PropTypes.bool,
  space: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(spacingAliases),
  ]),
};

export default function Inline(props) {
  const {
    align = 'left',
    alignY = 'top',
    children,
    space = 'none',
    ...rest
  } = props;

  return (
    <Root {...rest}>
      <Content
        align={align}
        alignY={alignY}
        marginLeft={space !== 'none' ? `-${space}` : 'none'}
        marginTop={space !== 'none' ? `-${space}` : 'none'}
      >
        {React.Children.map(children, (child) => (
          <Item paddingLeft={space} paddingTop={space}>
            {child}
          </Item>
        ))}
      </Content>
    </Root>
  );
}
