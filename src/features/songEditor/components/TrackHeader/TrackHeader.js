import styled from 'styled-components';
import * as palette from '../../../../styles/palette.js';

export const TrackHeader = styled.div`
  align-items: center;
  align-self: flex-start;
  background-color: ${palette.emerald[0]};
  color: ${palette.almostblack};
  display: flex;
  font-weight: 800;
  height: 28px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
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
