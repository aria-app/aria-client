import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import fence from 'modules/fence';
import notes from 'modules/notes';
import shared from 'modules/shared';
import * as constants from '../../constants';
import { SlotsContainer } from '../slots-container/slots-container';
import {
  PositionMarkerContainer,
} from '../position-marker-container/position-marker-container';
import './grid.scss';

const { FenceContainer } = fence.components;
const { NotesContainer } = notes.components;
const { getElementRef } = shared.helpers;

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
      gridRef: elementRef,
      toolTypes: constants.toolTypes,
      playNote,
      sequenceContentRef,
      toolType,
    }),
    h(FenceContainer),
    h(PositionMarkerContainer),
  ]),
]);

const composed = compose([
  setPropTypes({
    playNote: PropTypes.func,
    scale: PropTypes.array,
    sequenceContentRef: PropTypes.object,
    toolType: PropTypes.string,
  }),
  getElementRef(),
  pure,
])(component);

export const Grid = composed;
