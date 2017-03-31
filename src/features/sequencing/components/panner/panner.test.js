import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Panner } from './panner';

describe('Panner Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Panner, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have grab class when enabled', () => {
    const component = shallow(h(Panner, {
      ...getRequiredProps(),
      isEnabled: true,
    }));
    expect(component.prop('className')).toContain('panner--grab');
  });

  it('should not have grab class when not enabled', () => {
    const component = shallow(h(Panner, {
      ...getRequiredProps(),
      isEnabled: false,
    }));
    expect(component.prop('className')).not.toContain('panner--grab');
  });
});

function getRequiredProps() {
  return {
    isEnabled: false,
    onScrollLeftChange: () => {},
    onScrollTopChange: () => {},
  };
}
