import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Toolbar } from './toolbar';

describe('Toolbar Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Toolbar));
    expect(component.length).toEqual(1);
  });
  it('should have alternate class when alternate');
  it('should not have alternate class when not alternate');
  it('should have position bottom class when position is bottom');
  it('should not have position bottom class when position is not bottom');
  it('should have position top class when position is top');
  it('should not have position top class when position is not top');
  describe('element __left', () => {
    it('should be defined');
    it('should contain left items when not alternate');
    it('should not contain left items when alternate');
    it('should contain alternate left items when alternate');
    it('should not contain alternate left items when not alternate');
  });
  describe('element __right', () => {
    it('should be defined');
    it('should contain right items when not alternate');
    it('should not contain right items when alternate');
    it('should contain alternate right items when alternate');
    it('should not contain alternate right items when not alternate');
  });
});
