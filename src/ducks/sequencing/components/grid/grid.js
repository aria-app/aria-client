import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import selecting from 'ducks/selecting';
import shared from 'ducks/shared';
import {
  SequencerTimelineContainer,
} from '../sequencer-timeline-container/sequencer-timeline-container';
import { NotesContainer } from '../notes/notes-container';
import { SlotsContainer } from '../slots/slots-container';
import * as helpers from '../../helpers';
import './grid.scss';

const { FenceContainer } = selecting.components;
const { getElementRef } = shared.helpers;
const { toolTypes } = shared.constants;
const scale = shared.helpers.getScale();

const component = props => h('.grid', {
  onMouseDown: props.onMouseDown,
  onMouseMove: props.onMouseMove,
  onMouseUp: props.onMouseUp,
  onScroll: props.onScroll,
}, [
  h('.grid__wrapper', {
    style: {
      width: props.measureCount !== undefined
        ? props.measureCount * 4 * 8 * 40
        : 0,
    },
  }, [
    h(SlotsContainer, {
      scale,
    }),
    h(NotesContainer, {
      toolType: props.toolType,
      toolTypes,
    }),
    h(FenceContainer),
    h(SequencerTimelineContainer),
  ]),
]);

const composed = compose(
  setDisplayName('Sequencer'),
  getElementRef(),
  pure,
  setPropTypes({
    isPanning: PropTypes.bool,
    measureCount: PropTypes.number,
    sequencerContentRef: PropTypes.object,
    scrolledHorizontally: PropTypes.func.isRequired,
    startPanning: PropTypes.func.isRequired,
    toolType: PropTypes.string,
    mouseMoved: PropTypes.func.isRequired,
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
)(component);

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
    props.mouseMoved(props.getMousePoint(e));

    if (props.isPanning) {
      props.updatePanningWithElements(e);
    }
  };
}

function onScroll(props) {
  return (e) => {
    props.scrolledHorizontally(Math.floor(e.target.scrollLeft / 40));
  };
}
