import { PropTypes } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const LeftItems = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  flex: '1 1 auto',
}));

const RightItems = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  marginLeft: 'auto',
}));

const Root = styled.div(({ theme }) => ({
  alignItems: 'stretch',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flex: '0 0 auto',
  height: 56,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  position: 'relative',
}));

Toolbar.propTypes = {
  className: PropTypes.string,
  isAlternate: PropTypes.bool,
  leftItems: PropTypes.node,
  leftItemsAlt: PropTypes.node,
  rightItems: PropTypes.node,
  rightItemsAlt: PropTypes.node,
};

function Toolbar(props) {
  const {
    isAlternate,
    leftItems,
    leftItemsAlt,
    rightItems,
    rightItemsAlt,
    ...rest
  } = props;

  return (
    <Root {...rest}>
      <LeftItems>{isAlternate ? leftItemsAlt : leftItems}</LeftItems>
      <RightItems>{isAlternate ? rightItemsAlt : rightItems}</RightItems>
    </Root>
  );
}

export default React.memo(Toolbar);
