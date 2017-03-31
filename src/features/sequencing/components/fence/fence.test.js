import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Fence } from './fence';

describe('Fence Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should have display "block" when selecting and has moved from start point', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 0, y: 1 },
      isSelecting: true,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').display).toEqual('block');
  });

  it('should have display "none" when still at start point', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 0, y: 0 },
      isSelecting: true,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').display).toEqual('none');
  });

  it('should have display "none" when not selecting', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 0, y: 1 },
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').display).toEqual('none');
  });

  it('should have width of (change in x + 1) * 40', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 50, y: 0 },
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').width).toEqual(51 * 40);
  });

  it('should have width of 0 when start point is empty', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 0, y: 0 },
      isSelecting: false,
      startPoint: {},
    }));
    expect(component.prop('style').width).toEqual(0);
  });

  it('should have width of 0 when end point is empty', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: {},
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').width).toEqual(0);
  });

  it('should have height of (change in y + 1) * 40', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 0, y: 40 },
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').height).toEqual(41 * 40);
  });

  it('should have height of 0 when start point is empty', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 0, y: 0 },
      isSelecting: false,
      startPoint: {},
    }));
    expect(component.prop('style').height).toEqual(0);
  });

  it('should have height of 0 when end point is empty', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: {},
      isSelecting: false,
      startPoint: { x: 0, y: 0 },
    }));
    expect(component.prop('style').height).toEqual(0);
  });

  it('should be translated to top left corner of selection when growing normally', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 23, y: 45 },
      isSelecting: true,
      startPoint: { x: 10, y: 30 },
    }));
    const expected = 'translate(400px, 1200px)';
    expect(component.prop('style').transform).toEqual(expected);
  });

  it('should be translated to top left corner of selection when growing inversely', () => {
    const component = shallow(h(Fence, {
      ...getDefaultProps(),
      endPoint: { x: 4, y: 20 },
      isSelecting: true,
      startPoint: { x: 10, y: 30 },
    }));
    const expected = 'translate(160px, 800px)';
    expect(component.prop('style').transform).toEqual(expected);
  });
});

function getDefaultProps() {
  return {
    endPoint: { x: 0, y: 0 },
    isSelecting: false,
    startPoint: { x: 0, y: 0 },
  };
}
