import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import notes from 'modules/notes';
import { SlotsContainer } from '../slots-container/slots-container';
import {
  PositionMarkerContainer,
} from '../position-marker-container/position-marker-container';
import './grid.scss';

const { NotesContainer } = notes.components;

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
