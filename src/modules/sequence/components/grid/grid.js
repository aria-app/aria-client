import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import { NotesContainer } from '../notes-container/notes-container';
import {
  PositionMarkerContainer,
} from '../position-marker-container/position-marker-container';
import { SlotsContainer } from '../slots-container/slots-container';
import './grid.scss';

const component = ({
  playNote,
  scale,
  toolType,
}) => h('.grid', [
  h('.grid__wrapper', [
    h(SlotsContainer, {
      playNote,
      scale,
      toolType,
    }),
    h(NotesContainer, {
      playNote,
      toolType,
    }),
    h(PositionMarkerContainer),
  ]),
]);

const composed = compose([
  setPropTypes({
    playNote: PropTypes.func,
    scale: PropTypes.array,
    toolType: PropTypes.string,
  }),
  pure,
])(component);

export const Grid = composed;
