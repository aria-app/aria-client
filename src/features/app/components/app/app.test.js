import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { App } from './app';

describe('App Component', () => {
  it('should be defined', () => {
    const app = shallow(h(App, {
      startDraggingFile: () => {},
      isSequenceOpen: false,
    }));
    expect(app).not.toBe(undefined);
  });
});
