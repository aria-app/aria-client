import getOr from 'lodash/fp/getOr';
import styled from 'styled-components';

const getX0 = getOr(0, 'note.points[0].x');
const getX1 = getOr(0, 'note.points[1].x');
const getY0 = getOr(0, 'note.points[0].y');

export const TrackSequenceNote = styled.div`
  background-color: ${props => props.theme.almostblack};
  height: 1px;
  left: 0;
  position: absolute;
  top: 0;
  transform: ${props => `translate(${getX0(props) * 2}px, ${getY0(props)}px)`};
  width: ${props => ((getX1(props) - getX0(props)) + 1) * 2}px;
`;
