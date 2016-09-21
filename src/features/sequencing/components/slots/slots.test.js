import h from 'react-hyperscript';
import { mount } from 'enzyme';
import { Slots } from './slots';

describe('Slots Component', () => {
  it('should be defined', () => {
    const component = mount(h(Slots, {
      measureCount: 0,
      slots: [],
    }));
    expect(component).toBeDefined();
  });

  describe('row', () => {
    it('should have class corresponding to note name', () => {
      expect(false).toEqual(true);
    });
  });
});
