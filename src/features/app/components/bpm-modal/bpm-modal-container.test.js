import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { BPMModal } from './bpm-modal';
import { BPMModalContainer } from './bpm-modal-container';

const store = {
  dispatch: () => {},
  getState: () => ({
    app: {},
    song: {},
  }),
  subscribe: () => {},
};

describe('BPM Modal Container', () => {
  it('should return an BPMModal component', () => {
    const component = shallow(h(BPMModalContainer), { context: { store } });
    expect(component.type()).toEqual(BPMModal);
  });
});
