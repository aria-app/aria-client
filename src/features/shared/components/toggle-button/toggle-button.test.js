import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ToggleButton } from './toggle-button';

describe('ToggleButton Component', () => {
  it('should be defined', () => {
    const component = shallow(h(ToggleButton));
    expect(component.length).toEqual(1);
  });

  it('should have active class if active', () => {
    const component = shallow(h(ToggleButton, {
      isActive: true,
    }));
    expect(component.prop('className')).toContain('toggle-button--active');
  });

  it('should not have active class if not active', () => {
    const component = shallow(h(ToggleButton, {
      isActive: false,
    }));
    expect(component.prop('className')).not.toContain('toggle-button--active');
  });

  it('should invoke click event when clicked', () => {
    const onClick = sinon.spy();
    const component = shallow(h(ToggleButton, {
      onClick,
    }));
    component.simulate('click');
    expect(onClick.called).toEqual(true);
  });

  it('should not throw if click event is not defined when clicked', () => {
    const onClick = () => {};
    const component = shallow(h(ToggleButton, {
      onClick,
    }));
    const fn = () => component.simulate('click');
    expect(fn).not.toThrow();
  });
});
