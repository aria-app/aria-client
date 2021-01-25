import styled from '@emotion/styled';
import includes from 'lodash/fp/includes';
import PropTypes from 'prop-types';
import React from 'react';

import { spacingAliases, verticalAlignments } from '../constants';
import Box from './Box';

function getStylesFromWidth(width) {
  if (includes('/', width)) {
    const dividendAndDivisor = width.split('/').map(parseFloat);
    const percent = (dividendAndDivisor[0] / dividendAndDivisor[1]) * 100;
    return { flex: `0 0 ${percent}%` };
  }

  if (width === 'content') {
    return { flexShrink: 0 };
  }

  return { width: '100%' };
}

const Root = styled.div(({ alignY, isReversed }) => ({
  alignItems: {
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }[alignY],
  display: 'flex',
  flexDirection: isReversed && 'row-reverse',
}));

const Column = styled.div(({ alignY }) => ({
  alignItems: {
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }[alignY],
  display: 'flex',
}));

const ColumnContent = styled(Box)(({ alignY }) => ({
  alignItems: {
    bottom: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    top: 'flex-start',
  }[alignY],
  display: 'flex',
  flexGrow: 1,
}));

Columns.propTypes = {
  alignY: PropTypes.oneOf(verticalAlignments),
  isReversed: PropTypes.bool,
  space: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(spacingAliases),
  ]),
};

export default function Columns(props) {
  const {
    alignY = 'top',
    children,
    isReversed,
    space = 'none',
    ...rest
  } = props;

  return (
    <Root alignY={alignY} isReversed={isReversed} {...rest}>
      {React.Children.map(children, (child, index) => (
        <Column style={getStylesFromWidth(child.props.width)}>
          <ColumnContent
            {...(isReversed
              ? { paddingRight: index > 0 ? space : 'none' }
              : { paddingLeft: index > 0 ? space : 'none' })}
          >
            {child}
          </ColumnContent>
        </Column>
      ))}
    </Root>
  );
}
