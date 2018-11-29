import styled from 'styled-components';

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding-left: ${props => props.theme.margin.s}px;
  padding-right: ${props => props.theme.margin.s}px;
  color: ${props => props.theme.almostblack};
  text-transform: uppercase;
  border-radius: ${props => props.theme.borderRadius}px;
  cursor: pointer;
  user-select: none!important;
  &:active {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;
