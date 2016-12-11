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

  it('should have display block when visible', () => {
    const component = shallow(h(Timeline, {
      isVisible: true,
      offset: 0,
    }));
    expect(component.prop('style').display).toEqual('block');
  });

  it('should have display none when not visible', () => {
    const component = shallow(h(Timeline, {
      isVisible: false,
      offset: 0,
    }));
    expect(component.prop('style').display).toEqual('none');
  });

  it('should have translateX equal to offset', () => {
    const offset = 40;
    const component = shallow(h(Timeline, {
      offset,
    }));
    expect(component.prop('style').transform).toEqual(`translateX(${offset}px)`);
  });
});
