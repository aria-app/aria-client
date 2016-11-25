import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { SongToolbar } from './song-toolbar';

describe('SongToolbar Component', () => {
  it('should be defined', () => {
    const component = shallow(h(SongToolbar, {
      BPM: 150,
      onBPMModalOpen: () => {},
      onPause: () => {},
      onPlay: () => {},
      onStop: () => {},
      playbackState: '',
      stringifiedSong: '',
    }));
    expect(component.length).toEqual(1);
  });
  it('should have correct value for position');
  describe('element __playback-buttons', () => {
    it('should be defined');
  });
  describe('child component __playback-buttons__play-button', () => {
    it('should be defined');
    it('should be active when playback state is started');
    it('should not be active when playback state is not started');
    it('should receive correct props');
  });
  describe('child component __playback-buttons__pause-button', () => {
    it('should be defined');
    it('should be active when playback state is paused');
    it('should not be active when playback state is not paused');
    it('should receive correct props');
  });
  describe('child component __playback-buttons__stop-button', () => {
    it('should be defined');
    it('should be active when playback state is stopped');
    it('should not be active when playback state is not stopped');
    it('should receive correct props');
  });
  describe('child component __clear-cache-button', () => {
    it('should be defined');
    it('should receive correct props');
  });
  describe('child component __set-bpm-button', () => {
    it('should be defined');
    it('should receive correct props');
  });
  describe('child component __set-bpm-button', () => {
    it('should be defined');
    it('should receive correct props');
  });
});
