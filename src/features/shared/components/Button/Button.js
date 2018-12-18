import styled from 'styled-components';

export const Button = styled.div`
  align-items: center;
  border-radius: ${props => props.theme.borderRadius}px;
  color: ${props => props.theme.almostblack};
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  padding-left: ${props => props.theme.margin.s}px;
  padding-right: ${props => props.theme.margin.s}px;
  position: relative;
  text-transform: uppercase;
  user-select: none!important;
  &::after {
    background-color: black;
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }
  &:hover::after {
    opacity: 0.05;
  }
  &:active::after {
    opacity: 0.1;
  }
`;
