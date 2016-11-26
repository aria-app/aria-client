import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Fence } from './fence';

describe('Fence Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Fence, {
      endPoint: { x: 0, y: 0 },
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.length).toEqual(1);
  });

  it('should have display "block" when selecting and has moved from start point');
  it('should have display "none" when still at start point');
  it('should have display "none" when not selecting');
  it('should have width of (change in x) * 40');
  it('should have width of 0 when start point is empty');
  it('should have width of 0 when end point is empty');
  it('should have height of (change in y) * 40');
  it('should have height of 0 when start point is empty');
  it('should have height of 0 when end point is empty');
  it('should be translated to top left corner of selection when growing normally');
  it('should be translated to top left corner of selection when growing inversely');
});
