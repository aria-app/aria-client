import React from 'react';
import h from 'react-hyperscript';
import selecting from '../../../selecting';
import sequencingPosition from '../../../sequencing-position';
import shared from '../../../shared';
import {
  SequencerTimelineContainer,
} from '../sequencer-timeline-container/sequencer-timeline-container';
import { NotesContainer } from '../notes/notes-container';
import { SlotsContainer } from '../slots/slots-container';
import './grid.scss';

const { FenceContainer } = selecting.components;
const { getMousePoint } = sequencingPosition.helpers;
const { toolTypes } = shared.constants;

export class Grid extends React.Component {
  static propTypes = {
    isPanning: React.PropTypes.bool,
    measureCount: React.PropTypes.number,
    onHorizontalScroll: React.PropTypes.func.isRequired,
    onMouseMove: React.PropTypes.func.isRequired,
    onPanningStart: React.PropTypes.func.isRequired,
    onPanningUpdate: React.PropTypes.func.isRequired,
    sequencerContentRef: React.PropTypes.object,
    toolType: React.PropTypes.string,
  }

  render() {
    return h('.grid', {
      onMouseDown: this.handleMouseDown,
      onMouseMove: this.handleMouseMove,
      onScroll: this.handleScroll,
      ref: this.setRef,
    }, [
      h('.grid__wrapper', {
        style: this.getWrapperStyle(),
      }, [
        h(SlotsContainer),
        h(NotesContainer),
        h(FenceContainer),
        h(SequencerTimelineContainer),
      ]),
    ]);
  }

  getMousePoint = e => getMousePoint(
    this.elementRef,
    this.props.sequencerContentRef,
    e,
  )

  getWrapperStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? this.props.measureCount * 4 * 8 * 40
        : 0,
    };
  }

  handleMouseDown = (e) => {
    const { PAN } = toolTypes;

    if (this.props.toolType === PAN) {
      this.startPanningWithElements(e);
    }
  }

  handleMouseMove = (e) => {
    this.props.onMouseMove(this.getMousePoint(e));

    if (this.props.isPanning) {
      this.updatePanningWithElements(e);
    }
  }

  handleScroll = (e) => {
    this.props.onHorizontalScroll(Math.floor(e.target.scrollLeft / 40));
  }

  setRef = (ref) => {
    this.elementRef = ref;
  }

  startPanningWithElements = e => this.props.onPanningStart(
    this.elementRef,
    this.props.sequencerContentRef,
    e,
  )

  updatePanningWithElements = e => this.props.onPanningUpdate(
    this.elementRef,
    this.props.sequencerContentRef,
    e,
  )
}
