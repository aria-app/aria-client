import { isEqual } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import {
  SequencerTimelineContainer,
} from '../sequencer-timeline-container/sequencer-timeline-container';
import { NotesContainer } from '../notes/notes-container';
import { DrawLayer } from '../draw-layer/draw-layer';
import { Panner } from '../panner/panner';
import { Selector } from '../selector/selector';
import { SlotsContainer } from '../slots/slots-container';
import './grid.scss';

const { toolTypes } = shared.constants;

export class Grid extends React.Component {
  static propTypes = {
    activeSequenceId: React.PropTypes.string.isRequired,
    areSomeNotesSelected: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDraw: React.PropTypes.func.isRequired,
    onMove: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    onSelectInArea: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    sequencerContentRef: React.PropTypes.object,
    toolType: React.PropTypes.string.isRequired,
  }

  state = {
    mousePoint: {
      x: -1,
      y: -1,
    },
  };

  render() {
    return h('.grid', {
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      onScroll: this.handleScroll,
      ref: this.setRef,
    }, [
      h('.grid__wrapper', {
        style: this.getWrapperStyle(),
      }, [
        h(SlotsContainer),
        h(DrawLayer, {
          activeSequenceId: this.props.activeSequenceId,
          isEnabled: this.getIsDrawLayerEnabled(),
          mousePoint: this.state.mousePoint,
          onDraw: this.handleDrawLayerDraw,
        }),
        h(Selector, {
          isEnabled: this.getIsSelectorEnabled(),
          mousePoint: this.state.mousePoint,
          notes: this.props.notes,
          onSelect: this.handleSelectorSelect,
          selectedNotes: this.props.selectedNotes,
        }, [
          h(NotesContainer, {
            measureCount: this.props.measureCount,
            mousePoint: this.state.mousePoint,
            onMove: this.handleNotesContainerMove,
            onResize: this.handleNotesContainerResize,
            selectedNotes: this.props.selectedNotes,
          }),
        ]),
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

  getIsDrawLayerEnabled = () => this.props.toolType === toolTypes.DRAW;

  getIsPannerEnabled = () => this.props.toolType === toolTypes.PAN;

  getIsSelectorEnabled = () => this.props.toolType === toolTypes.SELECT;

  getWrapperStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? this.props.measureCount * 4 * 8 * 40
        : 0,
    };
  }

  handleDrawLayerDraw = note =>
    this.props.onDraw(note);

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

  handleNotesContainerMove = delta =>
    this.props.onMove(delta);

  handleNotesContainerResize = payload =>
    this.props.onResize(payload);

  handlePannerScrollLeftChange = (scrollLeft) => {
    this.elementRef.scrollLeft = scrollLeft;
  };

  handlePannerScrollTopChange = (scrollTop) => {
    this.props.sequencerContentRef.scrollTop = scrollTop;
  };

  handleSelectorSelect = selectionInfo =>
    this.props.onSelectInArea(selectionInfo);

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
