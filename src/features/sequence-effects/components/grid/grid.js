import isEqual from 'lodash/fp/isEqual';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { DrawLayer } from '../draw-layer/draw-layer';
import { Notes } from '../notes/notes';
import { Panner } from '../panner/panner';
import { Selector } from '../selector/selector';
import { Slots } from '../slots/slots';
import './grid.scss';

const { Timeline } = shared.components;

export class Grid extends React.PureComponent {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDrag: React.PropTypes.func.isRequired,
    onDraw: React.PropTypes.func.isRequired,
    onErase: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
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
      onMouseMove: this.handleMouseMove,
      ref: this.setRef,
    }, [
      h('.grid__wrapper', {
        style: this.getWrapperStyle(),
      }, [
        h(Slots, {
          measureCount: this.props.measureCount,
        }),
        h(DrawLayer, {
          mousePoint: this.state.mousePoint,
          onDraw: this.props.onDraw,
          toolType: this.props.toolType,
        }),
        h(Selector, {
          mousePoint: this.state.mousePoint,
          notes: this.props.notes,
          onSelect: this.handleSelectorSelect,
          selectedNotes: this.props.selectedNotes,
          toolType: this.props.toolType,
        }, [
          h(Notes, {
            measureCount: this.props.measureCount,
            mousePoint: this.state.mousePoint,
            notes: this.props.notes,
            onDrag: this.props.onDrag,
            onErase: this.props.onErase,
            onResize: this.props.onResize,
            onSelect: this.props.onSelect,
            selectedNotes: this.props.selectedNotes,
            toolType: this.props.toolType,
          }),
        ]),
        h(Panner, {
          onScrollLeftChange: this.handlePannerScrollLeftChange,
          onScrollTopChange: this.handlePannerScrollTopChange,
          scrollLeftEl: this.elementRef,
          scrollTopEl: this.props.sequencerContentRef,
          toolType: this.props.toolType,
        }),
        h(Timeline, {
          isVisible: false,
          offset: 0 * 40,
        }),
      ]),
    ]);
  }

  getWrapperStyle() {
    return {
      width: this.props.measureCount !== undefined
        ? this.props.measureCount * 4 * 8 * 40
        : 0,
    };
  }

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

  handleSelectorSelect = (startPoint, isAdditive) =>
    this.props.onSelectInArea(startPoint, this.state.mousePoint, isAdditive);

  setRef = (ref) => {
    this.elementRef = ref;
    this.handleScroll();
  }
}

function getMousePoint(scrollLeftEl, scrollTopEl, e) {
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

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
