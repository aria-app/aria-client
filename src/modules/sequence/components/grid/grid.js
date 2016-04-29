import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, setPropTypes } from 'recompose';
import { NotesContainer } from '../notes-container/notes-container';
import {
  PositionMarkerContainer,
} from '../position-marker-container/position-marker-container';
import { SlotsContainer } from '../slots-container/slots-container';
import './grid.scss';

const component = ({
  playNote,
  scale,
  tool,
}) => h('.grid', [
  h('.grid__wrapper', [
    h(SlotsContainer, {
      playNote,
      scale,
      tool,
    }),
    h(NotesContainer, {
      playNote,
    }),
    h(PositionMarkerContainer),
  ]),
]);

const composed = compose([
  setPropTypes({
    playNote: PropTypes.func,
    scale: PropTypes.array,
    tool: PropTypes.string,
  }),
])(component);

export const Grid = composed;
