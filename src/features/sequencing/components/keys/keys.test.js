import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Keys } from './keys';

describe('Keys Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Keys, {
      onNotePreview: () => {},
    }));
    expect(component.length).toEqual(1);
  });
  describe('element __key', () => {
    it('should be defined once for each step in scale');
    it('should have class name corresponding to step');
    it('should invoke note preview event with corresponding step when clicked');
  });
  describe('element __key__label', () => {
    it('should be defined');
    it('should contain step name');
  });
});
