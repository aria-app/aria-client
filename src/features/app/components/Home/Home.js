import React from 'react';
import styled from 'styled-components';

const StyledHome = styled.div.attrs({
  className: 'StyledHome',
})`
  display: flex;
`;

export class Home extends React.Component {
  render() {
    return (
      <StyledHome>
        Home
      </StyledHome>
    );
  }
}
