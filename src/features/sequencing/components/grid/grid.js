import { isEqual } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import selecting from '../../../selecting';
import shared from '../../../shared';
import {
  SequencerTimelineContainer,
} from '../sequencer-timeline-container/sequencer-timeline-container';
import { NotesContainer } from '../notes/notes-container';
import { Panner } from '../panner/panner';
import { SlotsContainer } from '../slots/slots-container';
import './grid.scss';

const { FenceContainer } = selecting.components;
const { toolTypes } = shared.constants;

export class Grid extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number,
    sequencerContentRef: React.PropTypes.object,
    toolType: React.PropTypes.string,
  }

  state = {
    mousePoint: {
      x: -1,
      y: -1,
    },
  };

  render() {
    return h('.grid', {
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      onScroll: this.handleScroll,
      ref: this.setRef,
    }, [
      h('.grid__wrapper', {
        style: this.getWrapperStyle(),
      }, [
        h(SlotsContainer),
        h(NotesContainer, {
          mousePoint: this.state.mousePoint,
        }),
        h(FenceContainer),
        h(Panner, {
          isEnabled: this.getIsPannerEnabled(),
          onScrollLeftChange: this.handlePannerScrollLeftChange,
          onScrollTopChange: this.handlePannerScrollTopChange,
          scrollLeftEl: this.elementRef,
          scrollTopEl: this.props.sequencerContentRef,
        }),
        h(SequencerTimelineContainer),
      ]),
    ]);
  }

  getIsPannerEnabled = () => this.props.toolType === toolTypes.PAN;

  getWrapperStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? this.props.measureCount * 4 * 8 * 40
        : 0,
    };
  }

  handleMouseLeave = () => {
    this.setState({
      mousePoint: {
        x: -1,
        y: -1,
      },
    });
  };

  handleMouseMove = (e) => {
    const mousePoint = getMousePoint(
      e.currentTarget,
      this.props.sequencerContentRef,
      e,
    );

    this.setState((state) => {
      if (isEqual(state.mousePoint, mousePoint)) return {};
      return { mousePoint };
    });
  }

  handlePannerScrollLeftChange = (scrollLeft) => {
    this.elementRef.scrollLeft = scrollLeft;
  };

  handlePannerScrollTopChange = (scrollTop) => {
    this.props.sequencerContentRef.scrollTop = scrollTop;
  };

  setRef = (ref) => {
    this.elementRef = ref;
  }
}

function getMousePoint(scrollLeftEl, scrollTopEl, e) {
  const toSlotNumber = num => Math.floor(num / 40);
  const x = e.pageX || 0;
  const y = e.pageY || 0;
  const offsetLeft = scrollLeftEl.offsetLeft || 0;
  const offsetTop = scrollLeftEl.offsetTop || 0;
  const scrollLeft = scrollLeftEl.scrollLeft || 0;
  const scrollTop = scrollTopEl.scrollTop || 0;

  return {
    x: toSlotNumber((x - offsetLeft) + scrollLeft),
    y: toSlotNumber((y - offsetTop) + scrollTop),
  };
}
