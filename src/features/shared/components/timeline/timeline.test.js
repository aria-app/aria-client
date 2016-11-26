import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Timeline } from './timeline';

describe('Timeline Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Timeline, {
      offset: 0,
    }));
    expect(component.length).toEqual(1);
  });
  it('should have display block when visible');
  it('should have display none when not visible');
  it('should have translateX equal to offset');
});
