import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { SongTimelineContainer } from '../song-timeline-container/song-timeline-container';
import { TrackEditingModalContainer } from '../track-editing-modal/track-editing-modal-container';
import { TrackerToolbarContainer } from '../tracker-toolbar/tracker-toolbar-container';
import { TracksContainer } from '../tracks/tracks-container';
import { Tracker } from './tracker';

describe('Tracker Component', () => {
  it('should be defined', () => {
    const component = shallow(h(Tracker));
    expect(component.length).toEqual(1);
  });

  describe('child component TrackerToolbarContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracker));
      const trackerToolbarContainerEl = component.find(TrackerToolbarContainer);
      expect(trackerToolbarContainerEl.length).toEqual(1);
    });
  });

  describe('child component TracksContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracker));
      const tracksContainerEl = component.find(TracksContainer);
      expect(tracksContainerEl.length).toEqual(1);
    });
  });

  describe('child component SongTimelineContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracker));
      const songTimelineContainerEl = component.find(SongTimelineContainer);
      expect(songTimelineContainerEl.length).toEqual(1);
    });
  });

  describe('child component TrackEditingModalContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(Tracker));
      const trackEditingModalContainerEl = component.find(TrackEditingModalContainer);
      expect(trackEditingModalContainerEl.length).toEqual(1);
    });
  });
});
