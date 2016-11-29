import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Button } from './button';

describe('Button Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Button));
    expect(component.length).toEqual(1);
  });

  it('should invoke click event when clicked', () => {
    const onClick = sinon.spy();
    const component = shallow(h(Button, {
      onClick,
    }));
    component.simulate('click');
    expect(onClick.calledOnce).toEqual(true);
  });

  it('should not throw if click event is undefined when clicked', () => {
    const component = shallow(h(Button));
    expect(() => component.simulate('click')).not.toThrow();
  });

  it('should contain text', () => {
    const text = 'Some Text';
    const component = shallow(h(Button, {
      text,
    }));
    expect(component.text()).toEqual(text);
  });
});
