import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import selecting from '../../../selecting';
import shared from '../../../shared';
import { NotesContainer } from '../notes/notes-container';
import {
  SequencerTimelineContainer,
} from '../sequencer-timeline-container/sequencer-timeline-container';
import { SlotsContainer } from '../slots/slots-container';
import { Grid } from './grid';

const { FenceContainer } = selecting.components;
const { toolTypes } = shared.constants;

describe('Grid Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should invoke panning start event on mouse down if pan tool is selected', () => {
    const onPanningStart = sinon.spy();
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      toolType: toolTypes.PAN,
      onPanningStart,
    }));
    component.simulate('mousedown');
    expect(onPanningStart.called).toEqual(true);
  });

  it('should not invoke panning start event when on mouse down if pan tool is not selected', () => {
    const onPanningStart = sinon.spy();
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      toolType: toolTypes.DRAW,
      onPanningStart,
    }));
    component.simulate('mousedown');
    expect(onPanningStart.called).toEqual(false);
  });

  it('should invoke mouse move event when mouse moves', () => {
    const onMouseMove = sinon.spy();
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      onMouseMove,
    }));
    component.simulate('mousemove', {
      pageX: 0,
      pageY: 0,
    });
    expect(onMouseMove.called).toEqual(true);
  });

  it('should invoke panning update event when mouse moves if panning', () => {
    const onPanningUpdate = sinon.spy();
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      isPanning: true,
      onPanningUpdate,
    }));
    component.simulate('mousemove', {
      pageX: 0,
      pageY: 0,
    });
    expect(onPanningUpdate.called).toEqual(true);
  });

  it('should not invoke panning update event when mouse moves if not panning', () => {
    const onPanningUpdate = sinon.spy();
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      isPanning: false,
      onPanningUpdate,
    }));
    component.simulate('mousemove', {
      pageX: 0,
      pageY: 0,
    });
    expect(onPanningUpdate.called).toEqual(false);
  });

  it('should invoke horizontal scroll event with scroll offset in slots when scrolling horizontally', () => {
    const onHorizontalScroll = sinon.spy();
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      onHorizontalScroll,
    }));
    component.simulate('scroll', {
      target: {
        scrollLeft: 90,
      },
    });
    expect(onHorizontalScroll.lastCall.args).toEqual([2]);
  });

  it('should have correct ref function', () => {
    const component = shallow(h(Grid, {
      ...getRequiredProps(),
      isPanning: true,
    }));
    const el = component.find('.grid');
    expect(el.node.ref).toEqual(component.instance().setRef);
  });

  describe('element __wrapper', () => {
    it('should be defined', () => {
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
      }));
      const wrapperEl = component.find('.grid__wrapper');
      expect(wrapperEl.length).toEqual(1);
    });

    it('should have width of measureCount * 4 * 8 * 40', () => {
      const measureCount = 4;
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
        measureCount,
      }));
      const wrapperEl = component.find('.grid__wrapper');
      const expected = measureCount * 4 * 8 * 40;
      expect(wrapperEl.prop('style').width).toEqual(expected);
    });

    it('should have width of 0 when measureCount is undefined', () => {
      const measureCount = undefined;
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
        measureCount,
      }));
      const wrapperEl = component.find('.grid__wrapper');
      const expected = 0;
      expect(wrapperEl.prop('style').width).toEqual(expected);
    });
  });

  describe('child component SlotsContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
      }));
      const slotsContainerEl = component.find(SlotsContainer);
      expect(slotsContainerEl.length).toEqual(1);
    });
  });

  describe('child component NotesContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
      }));
      const notesContainerEl = component.find(NotesContainer);
      expect(notesContainerEl.length).toEqual(1);
    });
  });

  describe('child component FenceContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
      }));
      const fenceContainerEl = component.find(FenceContainer);
      expect(fenceContainerEl.length).toEqual(1);
    });
  });

  describe('child component SequencerTimelineContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Grid, {
        ...getRequiredProps(),
      }));
      const sequencerTimelineContainerEl = component.find(SequencerTimelineContainer);
      expect(sequencerTimelineContainerEl.length).toEqual(1);
    });
  });
});

function getRequiredProps() {
  return {
    isPanning: false,
    measureCount: 1,
    onHorizontalScroll: () => {},
    onMouseMove: () => {},
    onPanningStart: () => {},
    onPanningUpdate: () => {},
    sequencerContentRef: {},
    toolType: '',
  };
}
