import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Ruler } from './ruler';

describe('Ruler Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Ruler, {
      ...getRequiredProps(),
    }));
    expect(component).toBeDefined();
  });
  describe('element __body', () => {
    it('should be defined');
  });
  describe('element __body__header', () => {
    it('should be defined');
  });
  describe('element __body__measures', () => {
    it('should be defined');
    it('should have width equal to measure count * notes per measure * 2px per note');
    it('should invoke play event on mouse down');
    it('should invoke position set event with internal mouse position / (notes per measure * 2px per note) on mouse down');
    it('should invoke pause event on mouse down');
  });
  describe('element __body__measures__measure', () => {
    it('should be defined once for each measure');
    it('should have key equal to corresponding measure index');
    it('should have translateX equal to measure index * notes per measure * 2px per note');
  });
  describe('element __body__measures__measure__label', () => {
    it('should be defined once for each measure - 1');
    it('should not be defined in last measure');
    it('should contain corresponding label index + 1 when not last measure');
  });
  describe('element __body__measures__measure__eighth', () => {
    it('should be defined (once for each measure - 1) * (eighths per measure - 1)');
    it('should not be defined in last measure');
    it('should have translateX equal to eighth index * notes per measure * 2px per note / eighths per measure');
  });
  describe('element __song-length-button', () => {
    it('should be defined');
  });
  describe('element __song-length-button__side--left', () => {
    it('should be defined');
    it('should invoke song shorten event when clicked');
  });
  describe('child component __song-length-button__side--left__icon', () => {
    it('should be defined');
    it('should have chevron left icon');
    it('should have small size');
  });
  describe('element __song-length-button__side--right', () => {
    it('should be defined');
    it('should invoke song extend event when clicked');
  });
  describe('child component __song-length-button__side--right__icon', () => {
    it('should be defined');
    it('should have chevron right icon');
    it('should have small size');
  });
});

function getRequiredProps() {
  return {
    measureCount: 1,
    onPause: () => {},
    onPlay: () => {},
    onPositionSet: () => {},
    onSongExtend: () => {},
    onSongShorten: () => {},
    playbackState: '',
  };
}
