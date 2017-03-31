import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import * as constants from '../../constants';
import { Sequence } from './sequence';

describe('Sequence Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have active class when selected', () => {
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      isSelected: true,
    }));
    expect(component.prop('className')).toContain('sequence--active');
  });

  it('should not have active class when not selected', () => {
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      isSelected: false,
    }));
    expect(component.prop('className')).not.toContain('sequence--active');
  });

  it('should have translateX equal to sequence position * notes per measure * 2px per note', () => {
    const position = 4;
    const sequence = {
      notes: [],
      position,
    };
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      sequence,
    }));
    expect(component.prop('style').transform).toEqual(`translateX(${position * 32 * 2}px)`);
  });

  it('should have width equal to sequence measure count * notes per measure * 2px per note', () => {
    const measureCount = 4;
    const sequence = {
      notes: [],
      measureCount,
    };
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      sequence,
    }));
    expect(component.prop('style').width).toEqual(measureCount * 32 * 2);
  });

  it('should invoke select event when clicked', () => {
    const onSelect = sinon.spy();
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      onSelect,
    }));
    const e = {
      stopPropagation: () => {},
    };
    component.simulate('click', e);
    expect(onSelect.called).toEqual(true);
  });

  it('should stop propagation when clicked', () => {
    const stopPropagation = sinon.spy();
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
    }));
    const e = {
      stopPropagation,
    };
    component.simulate('click', e);
    expect(stopPropagation.called).toEqual(true);
  });

  it('should invoke context menu event with contextual actions and mouse coordinates on context menu', () => {
    const onContextMenu = sinon.spy();
    const sequence = {
      id: 'my-sequence',
      notes: [],
    };
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      onContextMenu,
      sequence,
    }));
    const items = [
      {
        text: 'Delete',
        action: constants.contextMenuActions.DELETE_SEQUENCE,
        id: sequence.id,
      },
    ];
    const e = {
      pageX: 25,
      pageY: 25,
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    component.simulate('contextmenu', e);
    expect(onContextMenu.lastCall.args).toEqual([items, {
      x: e.pageX,
      y: e.pageY,
    }]);
  });

  it('should prevent default on context menu', () => {
    const preventDefault = sinon.spy();
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
    }));
    const e = {
      stopPropagation: () => {},
      preventDefault,
    };
    component.simulate('contextmenu', e);
    expect(preventDefault.called).toEqual(true);
  });

  it('should stop propagation on context menu', () => {
    const stopPropagation = sinon.spy();
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
    }));
    const e = {
      preventDefault: () => {},
      stopPropagation,
    };
    component.simulate('contextmenu', e);
    expect(stopPropagation.called).toEqual(true);
  });

  it('should invoke open event with sequence id when double clicked', () => {
    const onOpen = sinon.spy();
    const sequence = {
      id: 'my-sequence',
      notes: [],
    };
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      onOpen,
      sequence,
    }));
    const e = {
      stopPropagation: () => {},
    };
    component.simulate('dblclick', e);
    expect(onOpen.called).toEqual(true);
    expect(onOpen.lastCall.args).toEqual([sequence.id]);
  });

  it('should stop propagation when double clicked', () => {
    const stopPropagation = sinon.spy();
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
      stopPropagation,
    }));
    const e = {
      stopPropagation,
    };
    component.simulate('dblclick', e);
    expect(stopPropagation.called).toEqual(true);
  });

  describe('element __note', () => {
    it('should be defined for each note in sequence notes', () => {
      const sequence = {
        notes: [
          {
            points: [
              { x: 0, y: 0 },
              { x: 1, y: 0 },
            ],
          },
          {
            points: [
              { x: 1, y: 2 },
              { x: 2, y: 2 },
            ],
          },
        ],
      };
      const component = shallow(h(Sequence, {
        ...getRequiredProps(),
        sequence,
      }));
      const noteEls = component.find('.sequence__note');
      expect(noteEls.length).toEqual(2);
    });

    it('should have translate of 2 * note first point x and 1 * note first point y', () => {
      const points = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ];
      const sequence = {
        notes: [
          { points },
        ],
      };
      const component = shallow(h(Sequence, {
        ...getRequiredProps(),
        sequence,
      }));
      const noteEls = component.find('.sequence__note');
      const expected = `translate(${points[0].x * 2}px, ${points[0].y}px)`;
      expect(noteEls.first().prop('style').transform).toEqual(expected);
    });

    it('should have width of 2 * note length', () => {
      const points = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ];
      const sequence = {
        notes: [
          { points },
        ],
      };
      const component = shallow(h(Sequence, {
        ...getRequiredProps(),
        sequence,
      }));
      const noteEls = component.find('.sequence__note');
      const expected = 2 * ((points[1].x - points[0].x) + 1);
      expect(noteEls.first().prop('style').width).toEqual(expected);
    });
  });
});

function getRequiredProps() {
  return {
    isSelected: false,
    onContextMenu: () => {},
    onSelect: () => {},
    onOpen: () => {},
    sequence: {
      notes: [],
    },
  };
}
