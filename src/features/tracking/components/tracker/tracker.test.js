import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Tracker } from './tracker';

describe('Tracker Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Tracker));
    expect(component.length).toEqual(1);
  });
  describe('child component TrackerToolbarContainer', () => {
    it('should be defined');
  });
  describe('child component TracksContainer', () => {
    it('should be defined');
  });
  describe('child component SongTimelineContainer', () => {
    it('should be defined');
  });
  describe('child component TrackEditingModalContainer', () => {
    it('should be defined');
  });
});
