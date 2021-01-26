import styled from '@emotion/styled';
import React from 'react';

const Root = styled.div({
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  flex: '1 1 auto',
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
});

function LoadingIndicator(props) {
  return <Root {...props} />;
}

export default React.memo(LoadingIndicator);
