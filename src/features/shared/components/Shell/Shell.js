import styled from "styled-components/macro";

export const Shell = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.almostwhite};
  bottom: 0;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;
