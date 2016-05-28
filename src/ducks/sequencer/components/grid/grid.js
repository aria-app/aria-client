import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import selection from 'ducks/selection';
import notes from 'ducks/notes';
import shared from 'ducks/shared';
import {
  PositionMarkerContainer,
} from '../position-marker-container/position-marker-container';
import { SlotsContainer } from '../slots-container/slots-container';
import * as helpers from '../../helpers';
import './grid.scss';

const { FenceContainer } = selection.components;
const { NotesContainer } = notes.components;
const { getElementRef } = shared.helpers;
const { toolTypes } = shared.constants;

const component = (props) => h('.grid', {
  onMouseDown: props.onMouseDown,
  onMouseMove: props.onMouseMove,
  onMouseUp: props.onMouseUp,
  onScroll: props.onScroll,
}, [
  h('.grid__wrapper', [
    h(SlotsContainer, {
      playNote: props.playNote,
      scale: props.scale,
      toolType: props.toolType,
    }),
    h(NotesContainer, {
      playNote: props.playNote,
      toolType: props.toolType,
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
    isPanning: PropTypes.bool,
    playNote: PropTypes.func,
    scale: PropTypes.array,
    sequencerContentRef: PropTypes.object,
    toolType: PropTypes.string,
    startPanning: PropTypes.func.isRequired,
    updateMousePoint: PropTypes.func.isRequired,
    updatePanning: PropTypes.func.isRequired,
  }),
  mapProps(props => ({
    ...props,
    getMousePoint: (e) => helpers.getMousePoint(
      props.elementRef,
      props.sequencerContentRef,
      e
    ),
    startPanningWithElements: e => props.startPanning(
      props.elementRef,
      props.sequencerContentRef,
      e
    ),
    updatePanningWithElements: e => props.updatePanning(
      props.elementRef,
      props.sequencerContentRef,
      e
    ),
  })),
  withHandlers({
    onMouseDown,
    onMouseMove,
    onScroll,
  }),
])(component);

export const Grid = composed;

function onMouseDown(props) {
  return (e) => {
    const { PAN } = toolTypes;

    if (props.toolType === PAN) {
      props.startPanningWithElements(e);
    }
  };
}

function onMouseMove(props) {
  return (e) => {
    props.updateMousePoint(props.getMousePoint(e));

    if (props.isPanning) {
      props.updatePanningWithElements(e);
    }
  };
}

function onScroll(props) {
  return (e) => {
    props.setScrollLeftIfChanged(Math.floor(e.target.scrollLeft / 40));
  };
}
