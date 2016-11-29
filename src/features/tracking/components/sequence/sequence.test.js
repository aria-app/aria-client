import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Sequence } from './sequence';

describe('Sequence Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Sequence, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });
  it('should have active class when active');
  it('should not have active class when not active');
  it('should have translateX equal to measure count * notes per measure * 2px per note');
  it('should have width equal to notes per measure * 2px per note');
  it('should invoke select event when clicked');
  it('should stop propagation when clicked');
  it('should invoke context menu event with contextual actions and mouse coordinates on context menu');
  it('should prevent default on context menu');
  it('should stop propagation on context menu');
  it('should invoke open event with sequence id when double clicked');
  it('should stop propagation when double clicked');
  describe('element __note', () => {
    it('should be defined for each note in sequence notes');
    it('should have translate of 2 * note first point x and 1 * note first point y');
    it('should have width of 2px * note length');
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
