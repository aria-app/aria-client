import styled from 'styled-components/macro';
import { mixins } from '../../styles';

export const Button = styled.div`
  align-items: center;
  border-radius: ${props => props.theme.borderRadius}px;
  color: ${props => props.theme.color};
  cursor: pointer;
  display: flex;
  height: 36px;
  justify-content: center;
  padding-left: ${props => props.theme.margin.s}px;
  padding-right: ${props => props.theme.margin.s}px;
  position: relative;
  text-transform: uppercase;
  user-select: none!important;
  ${mixins.interactionOverlay('black')}
`;
