import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import selection from 'modules/selection';
import notes from 'modules/notes';
import shared from 'modules/shared';
import { SlotsContainer } from '../slots-container/slots-container';
import {
  PositionMarkerContainer,
} from '../position-marker-container/position-marker-container';
import './grid.scss';

const { FenceContainer } = selection.components;
const { NotesContainer } = notes.components;
const { getElementRef } = shared.helpers;
const { toolTypes } = shared.constants;

const component = ({
  elementRef,
  playNote,
  scale,
  sequenceContentRef,
  toolType,
}) => h('.grid', [
  h('.grid__wrapper', [
    h(SlotsContainer, {
      playNote,
      scale,
      toolType,
    }),
    h(NotesContainer, {
      scrollLeftElement: elementRef,
      scrollTopElement: sequenceContentRef,
      playNote,
      toolType,
      toolTypes,
    }),
    h(FenceContainer),
    h(PositionMarkerContainer),
  ]),
]);

const composed = compose([
  getElementRef(),
  pure,
  setPropTypes({
    playNote: PropTypes.func,
    scale: PropTypes.array,
    sequenceContentRef: PropTypes.object,
    toolType: PropTypes.string,
  }),
])(component);

export const Grid = composed;
