import styled from 'styled-components';

export const TrackHeader = styled.div`
  align-items: center;
  align-self: flex-start;
  background-color: ${props => props.theme.primary[0]};
  color: ${props => props.theme.almostblack};
  display: flex;
  font-weight: 800;
  height: 28px;
  margin-bottom: ${props => props.theme.margin.s}px;
  padding-left: ${props => props.theme.margin.s}px;
  padding-right: ${props => props.theme.margin.s}px;
  text-transform: uppercase;
  transform: scale(1);
  transition: transform 0.2s ease;

  &:hover:not(:active) {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
`;
