import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { App } from './app';

describe('App Component', () => {
  it('should be defined', () => {
    const component = shallow(h(App, {
      isSequenceOpen: false,
      onFileDragStart: () => {},
    }));
    expect(component.length).toEqual(1);
  });

  it('should invoke file drag start event when file is dragged over');
  describe('child component SequencerContainer', () => {
    it('should be defined when sequence is open');
    it('should not be defined when sequence is not open');
  });
  describe('child component Tracker', () => {
    it('should be defined when sequence not is open');
    it('should not be defined when sequence is open');
  });
  describe('child component SongToolbarContainer', () => {
    it('should be defined');
  });
  describe('child component BPMModalContainer', () => {
    it('should be defined');
  });
  describe('child component ContextMenuContainer', () => {
    it('should be defined');
  });
  describe('child component UploadOverlayContainer', () => {
    it('should be defined');
  });
});
