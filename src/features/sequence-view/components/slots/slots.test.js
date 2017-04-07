import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Slots } from './slots';

describe('Slots Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Slots, {
      measureCount: 0,
      slots: [],
    }));
    expect(component).toBeDefined();
  });
  it('should be rewritten and then tested');
});
