import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Note } from './note';

describe('Note Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Note, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have active class when selected', () => {
    const component = shallow(h(Note, {
      ...getRequiredProps(),
      isSelected: true,
    }));
    expect(component.prop('className')).toContain('note--active');
  });

  it('should not have active class when not selected', () => {
    const component = shallow(h(Note, {
      ...getRequiredProps(),
      isSelected: false,
    }));
    expect(component.prop('className')).not.toContain('note--active');
  });

  it('should have translate corresponding to note points', () => {
    const component = shallow(h(Note, {
      ...getRequiredProps(),
      note: {
        points: [
          { x: 10, y: 23 },
          { x: 12, y: 23 },
        ],
      },
    }));
    const expected = 'translate(400px, 920px)';
    expect(component.prop('style').transform).toEqual(expected);
  });

  describe('element __point--start', () => {
    it('should be defined', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
      }));
      const pointStartEl = component.find('.note__point--start');
      expect(pointStartEl.length).toEqual(1);
    });

    it('should invoke mouse down with note and event when mouse down occurs', () => {
      const note = {
        points: [
          { x: 10, y: 23 },
          { x: 12, y: 23 },
        ],
      };
      const onMouseDown = sinon.spy();
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note,
        onMouseDown,
      }));
      const pointStartEl = component.find('.note__point--start');
      const e = {};
      pointStartEl.simulate('mousedown', e);
      expect(onMouseDown.lastCall.args).toEqual([note, e]);
    });

    it('should invoke mouse up with note and event when mouse up occurs', () => {
      const note = {
        points: [
          { x: 10, y: 23 },
          { x: 12, y: 23 },
        ],
      };
      const onMouseUp = sinon.spy();
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note,
        onMouseUp,
      }));
      const pointStartEl = component.find('.note__point--start');
      const e = {};
      pointStartEl.simulate('mouseup', e);
      expect(onMouseUp.lastCall.args).toEqual([note, e]);
    });
  });

  describe('element __point__fill--start', () => {
    it('should be defined', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
      }));
      const pointFillStartEl = component.find('.note__point__fill--start');
      expect(pointFillStartEl.length).toEqual(1);
    });
  });

  describe('element __point-connector', () => {
    it('should be defined', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
      }));
      const pointConnectorEl = component.find('.note__point-connector');
      expect(pointConnectorEl.length).toEqual(1);
    });

    it('should have correct transform applied when the note when the note is straight', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note: {
          points: [
            { x: 0, y: 35 },
            { x: 1, y: 35 },
          ],
        },
      }));
      const pointConnectorEl = component.find('.note__point-connector');
      const expected = 'rotate(0deg) scaleX(40)';
      expect(pointConnectorEl.prop('style').transform).toEqual(expected);
    });

    it('should have correct transform applied when the note when the note is bent', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note: {
          points: [
            { x: 0, y: 35 },
            { x: 1, y: 34 },
          ],
        },
      }));
      const pointConnectorEl = component.find('.note__point-connector');
      const expected = 'rotate(-44.99999999999999deg) scaleX(56.568542494923804)';
      expect(pointConnectorEl.prop('style').transform).toEqual(expected);
    });

    it('should have correct transform applied when the note is a 32nd note', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note: {
          points: [
            { x: 0, y: 35 },
            { x: 0, y: 35 },
          ],
        },
      }));
      const pointConnectorEl = component.find('.note__point-connector');
      const expected = 'rotate(0deg) scaleX(0)';
      expect(pointConnectorEl.prop('style').transform).toEqual(expected);
    });
  });

  describe('element __point--end', () => {
    it('should be defined', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
      }));
      const pointEndEl = component.find('.note__point--end');
      expect(pointEndEl.length).toEqual(1);
    });

    it('should have display none when note is 32nd note', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note: {
          points: [
            { x: 0, y: 35 },
            { x: 0, y: 35 },
          ],
        },
      }));
      const pointEndEl = component.find('.note__point--end');
      expect(pointEndEl.prop('style').display).toEqual('none');
    });

    it('should have display flex when note is not 32nd note', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note: {
          points: [
            { x: 0, y: 35 },
            { x: 1, y: 35 },
          ],
        },
      }));
      const pointEndEl = component.find('.note__point--end');
      expect(pointEndEl.prop('style').display).toEqual('flex');
    });

    it('should have translate equal to the changes in x and y between the points multiplied by 40px', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note: {
          points: [
            { x: 0, y: 35 },
            { x: 2, y: 39 },
          ],
        },
      }));
      const pointEndEl = component.find('.note__point--end');
      const expected = 'translate(80px, 160px)';
      expect(pointEndEl.prop('style').transform).toEqual(expected);
    });

    it('should invoke endpoint mouse down with note and event when mouse down occurs', () => {
      const note = {
        points: [
          { x: 0, y: 35 },
          { x: 0, y: 35 },
        ],
      };
      const onEndpointMouseDown = sinon.spy();
      const component = shallow(h(Note, {
        ...getRequiredProps(),
        note,
        onEndpointMouseDown,
      }));
      const pointEndEl = component.find('.note__point--end');
      const e = {};
      pointEndEl.simulate('mousedown', e);
      expect(onEndpointMouseDown.lastCall.args).toEqual([note, e]);
    });
  });

  describe('element __point__fill--end', () => {
    it('should be defined', () => {
      const component = shallow(h(Note, {
        ...getRequiredProps(),
      }));
      const pointFillEndEl = component.find('.note__point__fill--end');
      expect(pointFillEndEl.length).toEqual(1);
    });
  });
});

function getRequiredProps() {
  return {
    isSelected: false,
    note: {
      points: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
    },
    onEndpointMouseDown: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
  };
}
