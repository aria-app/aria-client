import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Note } from './note';

describe('Note Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Note, {
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
    }));
    expect(component.length).toEqual(1);
  });
  it('should have active class when active');
  it('should not have active class when not active');
  it('should have translate corresponding to note points');
  describe('element __point--start', () => {
    it('should be defined');
    it('should invoke mouse down with note and event when mouse down occurs');
    it('should invoke mouse up with note and event when mouse up occurs');
  });
  describe('element __point__fill--start', () => {
    it('should be defined');
  });
  describe('element __point-connector', () => {
    it('should be defined');
    it('should have correct transform applied when the note when the note is straight');
    it('should have correct transform applied when the note when the note is bent');
    it('should have correct transform applied when the note is a 32nd note');
  });
  describe('element __point--end', () => {
    it('should be defined');
    it('should have display none when note is 32nd note');
    it('should have display flex when note is not 32nd note');
    it('should have translate equal to the changes in x and y between the points multiplied by 40px');
    it('should invoke mouse down with note and event when mouse down occurs');
    it('should invoke mouse up with note and event when mouse up occurs');
  });
  describe('element __point__fill--end', () => {
    it('should be defined');
  });
});
