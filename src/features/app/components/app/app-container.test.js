import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { App } from './app';
import { AppContainer } from './app-container';

const store = {
  getState: () => ({
    song: {},
  }),
};

describe('App Container', () => {
  it('should return an App component', () => {
    const component = shallow(h(AppContainer), { context: { store } });
    expect(component.type()).toEqual(App);
  });
});
